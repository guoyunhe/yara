import { ThumbUp } from '@mui/icons-material';
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
import RelativeTime from '../../components/relative-time';
import Comment from '../../types/models/Comment';
import Notification from '../../types/models/Notification';
import Post from '../../types/models/Post';
import User from '../../types/models/User';

export interface LikeNotificationItemProps {
  notification: Notification;
  sx?: SxProps;
}

export default function LikeNotificationItem({ notification, sx }: LikeNotificationItemProps) {
  const { t } = useTranslation();

  const { data = {}, targetType, targetId } = notification;
  const { data: post } = useFetch<Post>(`/posts/${targetId}`, { disabled: targetType !== 'post' });
  const { data: comment } = useFetch<Comment>(`/comments/${targetId}`, {
    disabled: targetType !== 'comment',
  });
  const { data: user } = useFetch<User>(`/users/${data.userIds[0]}`);

  return (
    <ListItemButton
      component={Link}
      to={targetType === 'post' ? `/p/${post?.id}` : `/p/${comment?.postId}#comment-${comment?.id}`}
      onClick={() => {
        // mark notification as read
        axios.put(`/notifications/${notification.id}`, { read: true });
        // scroll to comment position
        if (comment) {
          setTimeout(() => {
            document.getElementById(`comment-${comment.id}`)?.scrollIntoView();
          }, 500);
        }
      }}
      alignItems="flex-start"
      divider
      sx={sx}
    >
      <ListItemAvatar sx={{ position: 'relative', minWidth: 0, mr: 2 }}>
        <Avatar src={user?.avatar?.url} />
        <Fab
          size="small"
          color="primary"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            right: -4,
            bottom: -4,
            transform: 'scale(0.5)',
            transformOrigin: 'right bottom',
          }}
        >
          <ThumbUp />
        </Fab>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box>
            {targetType === 'post'
              ? t(`{{user}} liked your post`, {
                  user: user?.name,
                })
              : t(`{{user}} liked your comment`, {
                  user: user?.name,
                })}
            <Box sx={{ fontStyle: 'italic', borderLeft: '2px solid #888888', pl: 2 }}>
              {comment?.content || post?.title}
            </Box>
          </Box>
        }
        secondary={<RelativeTime date={notification.createdAt} />}
      />
    </ListItemButton>
  );
}
