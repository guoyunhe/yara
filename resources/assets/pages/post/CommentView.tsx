import { AuthStatus, useAuth, useRequireAuth } from '@guoyunhe/react-auth';
import { Delete, Edit, Reply } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Stack } from '@mui/material';
import axios from 'axios';
import { ReactNode, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Liker from '../../components/liker';
import Markdown from '../../components/markdown';
import RelativeTime from '../../components/relative-time';
import UserBrief from '../../components/user-brief';
import Comment from '../../types/models/Comment';
import User from '../../types/models/User';
import CommentForm from './CommentForm';

export interface CommentViewProps {
  comment: Comment;
  children?: ReactNode;
  onCreate: (comment: Comment) => void;
  onUpdate: (comment: Comment) => void;
  onDelete: (comment: Comment) => void;
}

function CommentView({ comment, children, onCreate, onUpdate, onDelete }: CommentViewProps) {
  const { t } = useTranslation();
  const { user, status } = useAuth<User>();
  const requireAuth = useRequireAuth();

  const [replyOpen, setReplyOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const canEdit =
    status !== AuthStatus.LoggedIn && (comment.userId === user?.id || user?.role === 'admin');

  return (
    <Box display="flex">
      <Liker
        like={comment.likes?.[0]?.like}
        likesSum={comment.likesSum}
        onLike={(like) => {
          if (requireAuth()) {
            axios.post(`/comments/${comment.id}/likes`, { like });
          }
        }}
        sx={{ flex: '0 0 auto' }}
      />
      <Box flex="1 1 auto">
        <Box pr={2} maxWidth={816}>
          <Stack direction="row" spacing={1} mt={1} mb={2}>
            <UserBrief user={comment.user} avatarSize={32} />
            <RelativeTime date={comment.createdAt} />
          </Stack>

          {editOpen ? (
            <CommentForm
              comment={comment}
              postId={comment.postId}
              parentId={comment.id}
              open={editOpen}
              onClose={() => setEditOpen(false)}
              onUpdate={onUpdate}
              sx={{ mb: 2 }}
            />
          ) : (
            <Box>
              <Markdown>{comment.content}</Markdown>
              <Stack direction="row" mb={2}>
                <Button
                  startIcon={<Reply />}
                  onClick={() => {
                    if (requireAuth()) {
                      setReplyOpen(true);
                    }
                  }}
                >
                  {t('Reply')}
                </Button>
                {canEdit && (
                  <Button startIcon={<Edit />} onClick={() => setEditOpen(true)}>
                    {t('Edit')}
                  </Button>
                )}
                {canEdit && (
                  <LoadingButton
                    loading={deleting}
                    loadingPosition="start"
                    color="error"
                    startIcon={<Delete />}
                    onClick={() => {
                      // TODO: confirm before delete, and handle errors
                      setDeleting(true);
                      axios
                        .delete(`/posts/${comment.postId}/comments/${comment.id}`)
                        .then(() => {
                          onDelete(comment);
                        })
                        .finally(() => {
                          setDeleting(false);
                        });
                    }}
                  >
                    {t('Delete')}
                  </LoadingButton>
                )}
              </Stack>
            </Box>
          )}

          {replyOpen && (
            <CommentForm
              open={replyOpen}
              onClose={() => setReplyOpen(false)}
              postId={comment.postId}
              parentId={comment.id}
              onCreate={onCreate}
              sx={{ mb: 2 }}
            />
          )}
        </Box>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
}

export default memo(CommentView);
