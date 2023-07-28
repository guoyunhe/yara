import { Message } from '@mui/icons-material';
import { Container, List, ListItemButton, ListItemIcon } from '@mui/material';
import { useFetch } from 'react-fast-fetch';
import Paginated from '../../types/Paginated';
import Notification from '../../types/models/Notification';

export default function NotificationsPage() {
  const { data } = useFetch<Paginated<Notification>>(`/notifications?read=false&page=1`);

  return (
    <Container maxWidth="sm">
      <List>
        {data?.data.map((item) => (
          <ListItemButton key={item.id}>
            <ListItemIcon>
              <Message />
            </ListItemIcon>
          </ListItemButton>
        ))}
      </List>
    </Container>
  );
}
