import { useAuth } from '@guoyunhe/react-auth';
import { Delete, Edit, Reply } from '@mui/icons-material';
import { Box, Button, LinearProgress, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Markdown from '../../components/markdown';
import RelativeTime from '../../components/relative-time';
import TagChip from '../../components/tag-chip';
import UserBrief from '../../components/user-brief';
import Voter from '../../components/voter';
import Comment from '../../types/models/Comment';
import Post from '../../types/models/Post';
import User from '../../types/models/User';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

export default function PostPage() {
  const { t } = useTranslation();
  const { user } = useAuth<User>();
  const { postId } = useParams();
  const navigate = useNavigate();

  const {
    data: post,
    remove: removePost,
    loading: postLoading,
  } = useFetch<Post>(`/posts/${postId}`);

  const [commentOpen, setCommentOpen] = useState(false);
  const [newComments, setNewComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (post?.comments) {
      setNewComments(post.comments);
    }
  }, [post?.comments]);

  const createComment = useCallback(
    (comment: Comment) => setNewComments((prev) => [comment, ...prev]),
    []
  );

  const updateComment = useCallback(
    (comment: Comment) =>
      setNewComments((prev) => prev.map((item) => (item.id === comment.id ? comment : item))),
    []
  );

  const deleteComment = useCallback(
    (comment: Comment) => setNewComments((prev) => prev.filter((item) => item.id !== comment.id)),
    []
  );

  if (!post || postLoading) {
    return <LinearProgress />;
  }

  const canEdit = user?.id === post.userId || user?.role === 'admin';

  return (
    <Box component="article" sx={{ flex: '1 1 auto', overflow: 'auto' }}>
      <Box component="header" sx={{ display: 'flex' }}>
        <Box sx={{ flex: '0 0 auto' }}>
          <Voter
            vote={post.votes?.[0]?.vote}
            votesSum={post.votesSum}
            onVote={(vote) => {
              axios.post(`/posts/${post.id}/votes`, { vote });
            }}
            sx={{ mt: 6 }}
          />
        </Box>

        <Box sx={{ flex: '1 1 auto', pr: 2, maxWidth: 816 }}>
          <Stack direction="row" spacing={1} sx={{ my: 3 }}>
            {post.tags.map((tag) => (
              <TagChip key={tag.id} tag={tag} />
            ))}
          </Stack>
          <Typography variant="h1" mb={2}>
            {post.title}
          </Typography>
          <Stack direction="row" spacing={2}>
            <UserBrief user={post.user} avatarSize={32} />
            <RelativeTime date={post.createdAt} />
          </Stack>
          <Markdown>{post.content}</Markdown>
          <Stack direction="row" mb={2}>
            <Button startIcon={<Reply />} onClick={() => setCommentOpen(true)}>
              {t('Reply')} ({post.commentsCount})
            </Button>
            {canEdit && (
              <Button startIcon={<Edit />} component={Link} to={`/p/${post.id}/edit`}>
                {t('Edit')}
              </Button>
            )}
            {canEdit && (
              <Button
                color="error"
                startIcon={<Delete />}
                onClick={() => {
                  axios.delete(`/posts/${post.id}`).then(() => {
                    navigate('/');
                    removePost();
                  });
                }}
              >
                {t('Delete')}
              </Button>
            )}
          </Stack>
        </Box>
      </Box>
      <CommentForm
        postId={post.id}
        open={commentOpen}
        onClose={() => setCommentOpen(false)}
        onCreate={(comment) => {
          setNewComments((prev) => [comment, ...prev]);
        }}
        sx={{ pl: 8, pr: 2, mb: 3 }}
      />
      <CommentList
        comments={newComments}
        parentId={null}
        onCreate={createComment}
        onDelete={deleteComment}
        onUpdate={updateComment}
      />
    </Box>
  );
}
