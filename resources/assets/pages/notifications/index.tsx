import { Container, List } from '@mui/material';
import { useFetch } from 'react-fast-fetch';
import Paginated from '../../types/Paginated';
import Notification from '../../types/models/Notification';
import NotificationItem from './NotificationItem';

export default function NotificationsPage() {
  const { data } = useFetch<Paginated<Notification>>(`/notifications?page=1`);

  return (
    <Container maxWidth="sm" sx={{ px: { xs: 0, sm: 3 } }}>
      <List>
        {data?.data.map((item) => (
          <NotificationItem
            key={item.id}
            notification={item}
            sx={{ opacity: item.read ? 0.5 : 1 }}
          />
        ))}
      </List>
    </Container>
  );
}
