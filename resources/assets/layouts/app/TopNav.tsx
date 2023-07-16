import { AuthStatus, useAuth } from '@guoyunhe/react-auth';
import {
  Login as LoginIcon,
  Menu as MenuIcon,
  PersonAdd as PersonAddIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { AppBar, Avatar, Box, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { PaletteModeIconButton } from 'mui-palette-mode';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageMenu from '../../components/language-menu';
import User from '../../types/models/User';
import CreatePostButton from './CreatePostButton';
import LogoutButton from './LogoutButton';

export interface TopNavProps {
  onMenuButtonClick: () => void;
}

export default function TopNav({ onMenuButtonClick }: TopNavProps) {
  const { t } = useTranslation();
  const auth = useAuth<User>();

  return (
    <AppBar position="static" color="transparent" sx={{ zIndex: 1 }}>
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={onMenuButtonClick}>
          <MenuIcon />
        </IconButton>
        <Box
          component={Link}
          to="/"
          style={{ display: 'flex', color: 'inherit', textDecoration: 'none' }}
        >
          <Box component="img" src={window.SITE_LOGO} sx={{ width: 32, height: 32, mr: 1 }} />
          <Typography fontSize={20} color="inherit" component="div">
            {window.SITE_NAME}
          </Typography>
        </Box>
        <Box flex="1 1 auto" />
        <CreatePostButton />
        {auth.status === AuthStatus.LoggedIn && auth.user ? (
          <Stack direction="row">
            <Button
              variant="text"
              color="inherit"
              startIcon={
                <Avatar
                  src={auth.user.avatar?.url}
                  alt={auth.user.name}
                  sx={{ width: 24, height: 24 }}
                />
              }
              component={Link}
              to={`/u/${auth.user.username}`}
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              {auth.user.name}
            </Button>
            <PaletteModeIconButton />
            <LanguageMenu />
            <IconButton
              color="inherit"
              component={Link}
              to="/settings"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              <SettingsIcon />
            </IconButton>
            <LogoutButton />
          </Stack>
        ) : (
          <Stack direction="row">
            <PaletteModeIconButton />
            <LanguageMenu />
            <Button
              variant="text"
              color="inherit"
              startIcon={<LoginIcon />}
              component={Link}
              to="/login"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              {t('Login')}
            </Button>
            <Button
              variant="text"
              color="inherit"
              startIcon={<PersonAddIcon />}
              component={Link}
              to="/register"
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              {t('Register')}
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
