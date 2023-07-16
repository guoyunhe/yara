import { useRequireAuth } from '@guoyunhe/react-auth';
import { Comment as CommentIcon } from '@mui/icons-material';
import { Box, Button, Card, CardActions, CardContent, CardHeader, SxProps } from '@mui/material';
import { blue } from '@mui/material/colors';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Liker from '../../components/liker';
import RelativeTime from '../../components/relative-time';
import UserBrief from '../../components/user-brief';
import Post from '../../types/models/Post';

export interface PostCardProps {
  post: Post;
  excerptLength?: number;
  sx?: SxProps;
}

export default function PostCard({ post, excerptLength = 255, sx }: PostCardProps) {
  const requireAuth = useRequireAuth();

  const { tagId, postId } = useParams();

  return (
    <Card
      variant="outlined"
      component={Link}
      to={tagId ? `/t/${tagId}/p/${post.id}` : `/p/${post.id}`}
      sx={{
        display: 'flex',
        overflow: 'hidden',
        textDecoration: 'none',
        borderColor: postId === post.id.toString() ? blue[400] : undefined,
        ...sx,
      }}
    >
      <Box>
        <Liker
          like={post.likes?.[0]?.like}
          likesSum={post.likesSum}
          onLike={(like) => {
            if (requireAuth()) {
              axios.post(`/posts/${post.id}/likes`, { like });
            }
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          size="small"
        />
      </Box>
      <Box>
        <CardHeader
          title={post.title}
          subheader={
            <>
              <UserBrief user={post.user} />
              &nbsp;
              <RelativeTime date={post.createdAt} />
            </>
          }
          sx={{ pl: 0 }}
        />
        <CardContent sx={{ pl: 0, py: 0 }}>
          {post.content.substring(0, excerptLength)} {post.content.length > excerptLength && '...'}
        </CardContent>
        <CardActions sx={{ pl: 0 }}>
          <Button startIcon={<CommentIcon />} color="inherit">
            {post.commentsCount}
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
}
