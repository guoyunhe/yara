import { Message as MessageIcon } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Fab,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  SxProps,
} from '@mui/material';
import axios from 'axios';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BlockQuote from '../../components/block-quote';
import RelativeTime from '../../components/relative-time';
import Comment from '../../types/models/Comment';
import Notification from '../../types/models/Notification';

export interface CommentNotificationItemProps {
  notification: Notification;
  sx?: SxProps;
}

export default function CommentNotificationItem({
  notification,
  sx,
}: CommentNotificationItemProps) {
  const { t } = useTranslation();

  const { data = {}, targetType } = notification;
  const { data: comment } = useFetch<Comment>(`/comments/${data.commentId}`);

  return (
    <ListItemButton
      component={Link}
      to={`/p/${comment?.postId}#comment-${data.commentId}`}
      onClick={() => {
        // mark notification as read
        axios.put(`/notifications/${notification.id}`, { read: true });
        // scroll to comment position
        setTimeout(() => {
          document.getElementById(`comment-${data.commentId}`)?.scrollIntoView();
        }, 500);
      }}
      alignItems="flex-start"
      divider
      sx={sx}
    >
      <ListItemAvatar sx={{ position: 'relative', minWidth: 0, mr: 2 }}>
        <Avatar src={comment?.user?.avatar?.url} />
        <Fab
          size="small"
          color="secondary"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            right: -4,
            bottom: -4,
            transform: 'scale(0.5)',
            transformOrigin: 'right bottom',
          }}
        >
          <MessageIcon />
        </Fab>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box>
            {targetType === 'post'
              ? t(`{{user}} replied your post`, {
                  user: comment?.user?.name,
                })
              : t(`{{user}} replied your comment`, {
                  user: comment?.user?.name,
                })}
            <BlockQuote>{comment?.parent?.content || comment?.post?.title}</BlockQuote>
            <Box>{comment?.content?.substring(0, 255)}</Box>
          </Box>
        }
        secondary={<RelativeTime date={notification.createdAt} />}
      />
    </ListItemButton>
  );
}
