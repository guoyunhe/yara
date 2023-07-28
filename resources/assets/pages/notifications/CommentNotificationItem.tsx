import { Message } from '@mui/icons-material';
import { ListItemButton, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import Notification from '../../types/models/Notification';

export interface CommentNotificationItemProps {
  notification: Notification;
}

export default function CommentNotificationItem({ notification }: CommentNotificationItemProps) {
  const { data, targetId, targetType } = notification;
  const postId = targetType === 'post' ? targetId : data.postId;
  return (
    <ListItemButton component={Link} to={`/p/${postId}#comment-{}`}>
      <ListItemIcon>
        <Message />
      </ListItemIcon>
    </ListItemButton>
  );
}
