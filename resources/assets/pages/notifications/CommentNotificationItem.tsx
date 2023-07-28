import { Avatar, Box, ListItemAvatar, ListItemButton, ListItemText, SxProps } from '@mui/material';
import axios from 'axios';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
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

  const { data = {} } = notification;
  const { data: comment } = useFetch<Comment>(`/posts/${data.postId}/comments/${data.commentId}`);

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
      sx={sx}
    >
      <ListItemAvatar>
        <Avatar src={comment?.user?.avatar?.url} />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box>
            {t(`{{user}} replied you`, {
              user: comment?.user?.name,
            })}
            <Box sx={{ fontStyle: 'italic', borderLeft: '2px solid #888888', pl: 2 }}>
              {comment?.parent?.content || comment?.post?.title}
            </Box>
            <Box>{comment?.content?.substring(0, 255)}</Box>
          </Box>
        }
        secondary={<RelativeTime date={notification.createdAt} />}
      />
    </ListItemButton>
  );
}
