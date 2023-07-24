import { LoadingButton } from '@mui/lab';
import { Box, Button, Stack, SxProps, TextField } from '@mui/material';
import axios from 'axios';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import EmojiPicker from '../../components/emoji-picker';
import Comment from '../../types/models/Comment';

export interface CommentFormProps {
  comment?: Comment;
  onClose?: () => void;
  onCreate?: (comment: Comment) => void;
  onUpdate?: (comment: Comment) => void;
  postId: number | string | null;
  parentId?: number | string | null;
  sx?: SxProps;
}

export default function CommentForm({
  comment,
  postId,
  parentId,
  onClose,
  onCreate,
  onUpdate,
  sx,
}: CommentFormProps) {
  const textareaRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(comment?.content || '');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setContent(comment?.content || '');
  }, [comment?.content]);

  return (
    <Box sx={sx}>
      <Stack direction="row">
        <EmojiPicker
          onSelect={(emoji) => {
            const textarea = textareaRef.current?.querySelector('textarea');
            if (textarea) {
              textarea.focus();
              setContent(
                (prev) =>
                  prev.substring(0, Math.min(textarea.selectionStart, textarea.selectionEnd)) +
                  emoji.native +
                  prev.substring(Math.max(textarea.selectionStart, textarea.selectionEnd))
              );
            }
          }}
        />
      </Stack>
      <TextField
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={t('Comment')}
        multiline
        minRows={3}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Stack direction="row" spacing={1}>
        <LoadingButton
          loading={submitting}
          variant="contained"
          disabled={content.trim().length === 0}
          onClick={() => {
            setSubmitting(true);
            if (comment) {
              axios
                .put<Comment>(`/posts/${postId}/comments/${comment.id}`, { content })
                .then((res) => {
                  onUpdate?.(res.data);
                  setContent(res.data.content);
                  onClose?.();
                })
                .finally(() => {
                  setSubmitting(false);
                });
            } else {
              axios
                .post<Comment>(`/posts/${postId}/comments`, { content, parentId })
                .then((res) => {
                  onCreate?.(res.data);
                  setContent('');
                  onClose?.();
                  setTimeout(() => {
                    const element = document.getElementById(`comment-${res.data.id}`);
                    element?.scrollIntoView();
                  }, 1000);
                })
                .finally(() => {
                  setSubmitting(false);
                });
            }
          }}
        >
          {t('Submit')}
        </LoadingButton>
        {onClose && (
          <Button color="inherit" onClick={() => onClose?.()}>
            {t('Cancel')}
          </Button>
        )}
      </Stack>
    </Box>
  );
}
