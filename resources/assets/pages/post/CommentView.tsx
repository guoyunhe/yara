import { AuthStatus, useAuth, useRequireAuth } from '@guoyunhe/react-auth';
import { Edit, Reply } from '@mui/icons-material';
import { Box, Button, Stack } from '@mui/material';
import axios from 'axios';
import { ReactNode, memo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteButton from '../../components/delete-button';
import Liker from '../../components/liker';
import Markdown from '../../components/markdown';
import RelativeTime from '../../components/relative-time';
import UserBrief from '../../components/user-brief';
import Comment from '../../types/models/Comment';
import User from '../../types/models/User';
import isElementInViewport from '../../utils/isElementInViewport';
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

  const commentFormContainerRef = useRef<HTMLElement>(null);

  const canEdit =
    status === AuthStatus.LoggedIn && (comment.userId === user?.id || user?.role === 'admin');

  return (
    <Box id={`comment-${comment.id}`} display="flex">
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
          <Stack direction="row" spacing={2} mb={1}>
            <UserBrief user={comment.user} avatarSize={32} />
            <RelativeTime date={comment.createdAt} />
          </Stack>

          {editOpen ? (
            <CommentForm
              comment={comment}
              postId={comment.postId}
              parentId={comment.id}
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
                      // wait 100ms for form to render
                      setTimeout(() => {
                        if (commentFormContainerRef.current) {
                          commentFormContainerRef.current.querySelector('textarea')?.focus();
                          if (!isElementInViewport(commentFormContainerRef.current)) {
                            commentFormContainerRef.current.scrollIntoView(false);
                          }
                        }
                      }, 100);
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
                  <DeleteButton
                    url={`/posts/${comment.postId}/comments/${comment.id}`}
                    onSucceed={() => {
                      onDelete(comment);
                    }}
                  />
                )}
              </Stack>
            </Box>
          )}

          {replyOpen && (
            <Box ref={commentFormContainerRef}>
              <CommentForm
                onClose={() => setReplyOpen(false)}
                postId={comment.postId}
                parentId={comment.id}
                onCreate={onCreate}
                sx={{ mb: 2 }}
              />
            </Box>
          )}
        </Box>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
}

export default memo(CommentView);
