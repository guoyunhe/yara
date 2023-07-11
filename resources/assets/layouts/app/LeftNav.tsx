import { useAuth, useLogout } from '@guoyunhe/react-auth';
import {
  Login as LoginIcon,
  Logout as LogoutIcon,
  PersonAdd as PersonAddIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import {
  Avatar,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import TagListItem from '../../components/tag-list-item';
import Tag from '../../types/models/Tag';
import User from '../../types/models/User';
import { drawerWidth } from './config';

export interface LeftNavProps {
  drawerOpen: boolean;
  onDrawerClose: () => void;
}

export default function LeftNav({ drawerOpen, onDrawerClose }: LeftNavProps) {
  const { t } = useTranslation();
  const { user } = useAuth<User>();
  const { data: tags = [] } = useFetch<Tag[]>('/tags');
  const logout = useLogout();

  return (
    <Drawer open={drawerOpen} onClose={onDrawerClose} sx={{ width: drawerWidth }}>
      <List sx={{ width: drawerWidth }} onClick={onDrawerClose}>
        {user?.tags?.map((tag) => (
          <TagListItem key={tag.id} tag={tag} />
        ))}
        <Divider />
        {tags
          .filter((tag) => !user?.tags?.some((t) => t.id === tag.id))
          .map((tag) => (
            <TagListItem key={tag.id} tag={tag} />
          ))}

        <Divider />

        {user ? (
          <>
            <ListItemButton component={Link} to="/app">
              <ListItemIcon>
                <Avatar src={user.avatar?.url} sx={{ width: 24, height: 24 }} />
              </ListItemIcon>
              <ListItemText primary={user.name} />
            </ListItemButton>
            <ListItemButton component={Link} to="/app/settings">
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary={t('Settings')} />
            </ListItemButton>
            <ListItemButton onClick={logout.submit}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={t('Logout')} />
            </ListItemButton>
          </>
        ) : (
          <>
            <ListItemButton component={Link} to="/login">
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary={t('Login')} />
            </ListItemButton>
            <ListItemButton component={Link} to="/register">
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary={t('Register')} />
            </ListItemButton>
          </>
        )}
      </List>
    </Drawer>
  );
}
