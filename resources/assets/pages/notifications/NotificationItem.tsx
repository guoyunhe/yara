import { SxProps } from '@mui/material';
import Notification from '../../types/models/Notification';
import CommentNotificationItem from './CommentNotificationItem';

export interface NotificationItemProps {
  notification: Notification;
  sx?: SxProps;
}

export default function NotificationItem({ notification, sx }: NotificationItemProps) {
  switch (notification.type) {
    case 'comment':
      return <CommentNotificationItem notification={notification} sx={sx} />;
    default:
      return null;
  }
}
