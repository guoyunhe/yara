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
import BlockQuote from '../../components/block-quote';
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
        axios.put(`/notifications/${notification.id}`, { read: true }).then(() => {
          window.dispatchEvent(new Event('reload-unread-notification'));
        });
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
            {data.userIds.length > 1 ? (
              <>
                {targetType === 'post'
                  ? t(`{{user}} and {{count}} users liked your post`, {
                      user: user?.username,
                      count: data.userIds.length,
                    })
                  : t(`{{user}} and {{count}} users liked your comment`, {
                      user: user?.username,
                      count: data.userIds.length,
                    })}
              </>
            ) : (
              <>
                {targetType === 'post'
                  ? t(`{{user}} liked your post`, {
                      user: user?.username,
                    })
                  : t(`{{user}} liked your comment`, {
                      user: user?.username,
                    })}
              </>
            )}
            <BlockQuote>{comment?.content || post?.title}</BlockQuote>
          </Box>
        }
        secondary={<RelativeTime date={notification.createdAt} />}
      />
    </ListItemButton>
  );
}
