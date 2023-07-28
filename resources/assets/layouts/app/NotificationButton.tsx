import { NotificationsActive, NotificationsNone } from '@mui/icons-material';
import { Badge, IconButton } from '@mui/material';
import { useFetch } from 'react-fast-fetch';
import Paginated from '../../types/Paginated';

export default function NotificationButton() {
  const { data } = useFetch<Paginated<any>>(`/notifications?read=false&page=1`);
  return (
    <>
      <IconButton>
        <Badge badgeContent={data?.meta.total || 0} color="error">
          {data?.meta.total ? <NotificationsActive /> : <NotificationsNone />}
        </Badge>
      </IconButton>
    </>
  );
}
