import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import DeleteButton from '../../components/delete-button';
import User from '../../types/models/User';

export interface UserCardProps {
  user: User;
  onDelete: () => void;
}

export default function UserCard({ user, onDelete }: UserCardProps) {
  return (
    <ListItem
      divider
      secondaryAction={
        <DeleteButton
          url={`/users/${user.id}`}
          onSucceed={() => {
            onDelete();
          }}
        />
      }
    >
      <ListItemAvatar>
        <Avatar src={user.avatar?.url} />
      </ListItemAvatar>
      <ListItemText primary={user.username} secondary={user.email} />
    </ListItem>
  );
}
