import { NotificationsActive, NotificationsNone } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import { useFetch } from 'react-fast-fetch';
import { Link } from 'react-router-dom';
import Paginated from '../../types/Paginated';
import Notification from '../../types/models/Notification';

export default function NotificationButton() {
  const { data } = useFetch<Paginated<Notification>>(`/notifications?read=false&page=1`);
  return (
    <IconButton color="inherit" component={Link} to="/notifications">
      <Badge badgeContent={data?.meta.total || 0} color="error">
        {data?.meta.total ? <NotificationsActive /> : <NotificationsNone />}
      </Badge>
    </IconButton>
  );
}
