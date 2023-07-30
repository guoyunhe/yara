import { useAuth, useRequireAuth } from '@guoyunhe/react-auth';
import { Box, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Comment from '../../types/models/Comment';
import User from '../../types/models/User';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

export default function CommentContainer() {
  const { t } = useTranslation();
  const { user } = useAuth<User>();
  const requireAuth = useRequireAuth();
  const { postId } = useParams();
  const commentFormContainerRef = useRef<HTMLElement>(null);

  const { data } = useFetch<Comment[]>(`/posts/${postId}/comments`);

  const [newComments, setNewComments] = useState<Comment[]>([]);
  const [commentOrder, setCommentOrder] = useState('like');

  useEffect(() => {
    if (data) {
      setNewComments(data);
    }
  }, [data]);

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

  return (
    <Box>
      <Box
        id="new-comment"
        onClick={() => {
          requireAuth();
        }}
      >
        <CommentForm
          postId={postId!}
          onCreate={(comment) => {
            setNewComments((prev) => [comment, ...prev]);
          }}
          sx={{ mb: 3 }}
        />
      </Box>

      <Stack direction="row" sx={{ pl: 5, mb: 3 }}>
        <FormControl>
          <InputLabel>{t('Sort')}</InputLabel>
          <Select
            label={t('Sort')}
            value={commentOrder}
            onChange={(e) => setCommentOrder(e.target.value)}
          >
            <MenuItem value="like">{t('Most liked')}</MenuItem>
            <MenuItem value="new">{t('Newest')}</MenuItem>
            <MenuItem value="old">{t('Oldest')}</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <CommentList
        comments={newComments
          .map((item) => item)
          .sort((a, b) => {
            if (user?.id) {
              if (a.userId === user.id && b.userId !== user.id) return -Infinity;
              if (b.userId === user.id && a.userId !== user.id) return Infinity;
            }
            switch (commentOrder) {
              case 'new':
                return b.createdAt.localeCompare(a.createdAt);
              case 'old':
                return a.createdAt.localeCompare(b.createdAt);
              default:
                return b.likesSum - a.likesSum;
            }
          })}
        parentId={null}
        onCreate={createComment}
        onDelete={deleteComment}
        onUpdate={updateComment}
      />
    </Box>
  );
}
