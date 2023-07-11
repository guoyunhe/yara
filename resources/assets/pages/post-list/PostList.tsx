import { Box, List, ListItemButton, ListItemText } from '@mui/material';
import axios from 'axios';
import { useFetch } from 'react-fast-fetch';
import { Link, useParams } from 'react-router-dom';
import RelativeTime from '../../components/relative-time';
import UserBrief from '../../components/user-brief';
import Voter from '../../components/voter';
import Paginated from '../../types/Paginated';
import Post from '../../types/models/Post';

export default function PostList() {
  const { tagId = '', postId } = useParams();
  const { data: posts } = useFetch<Paginated<Post>>(`/posts?tagId=${tagId}`);

  return (
    <List dense disablePadding sx={{ flex: '0 0 300px', overflow: 'auto' }}>
      {posts?.data.map((post) => (
        <ListItemButton
          key={post.id}
          divider
          selected={postId === post.id.toString()}
          component={Link}
          to={tagId ? `/t/${tagId}/p/${post.id}` : `/p/${post.id}`}
          sx={{ alignItems: 'stretch' }}
        >
          <Voter
            vote={post.votes?.[0]?.vote}
            votesSum={post.votesSum}
            onVote={(vote) => {
              axios.post(`/posts/${post.id}/votes`, { vote });
            }}
            size="small"
            sx={{ ml: -2 }}
          />
          <ListItemText
            primary={post.title}
            primaryTypographyProps={{ flex: '1 1 auto' }}
            secondary={
              <Box component="span" display="flex">
                <UserBrief user={post.user} disabled />
                <Box component="span" flexGrow="1" />
                <Box component="span">
                  <RelativeTime date={post.createdAt} />
                </Box>
              </Box>
            }
            sx={{ display: 'flex', flexDirection: 'column' }}
          />
        </ListItemButton>
      ))}
    </List>
  );
}
