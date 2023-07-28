import { ListItemButton } from '@mui/material';
import Notification from '../../types/models/Notification';

export interface NotiItemProps {
  notification: Notification;
}

export default function NotiItem({ notification }: NotiItemProps) {
  return <ListItemButton></ListItemButton>;
}
