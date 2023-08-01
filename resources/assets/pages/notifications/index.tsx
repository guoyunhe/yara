import { Container, List, Theme, useMediaQuery } from '@mui/material';
import { useFetch } from 'react-fast-fetch';
import Paginated from '../../types/Paginated';
import Notification from '../../types/models/Notification';
import MobileAppBar from './MobileAppBar';
import NotificationItem from './NotificationItem';

export default function NotificationsPage() {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));

  const { data } = useFetch<Paginated<Notification>>(`/notifications?page=1`);

  return (
    <>
      {isMobile && <MobileAppBar />}
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
    </>
  );
}
