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
import NotificationIconButton from '../../components/notification-icon-button';
import User from '../../types/models/User';
import CreatePostButton from './CreatePostButton';
import LogoutIconButton from './LogoutIconButton';
import SearchBox from './SearchBox';

export default function DesktopAppBar() {
  const { t } = useTranslation();
  const auth = useAuth<User>();

  return (
    <AppBar position="static" color="inherit" sx={{ zIndex: 1 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => window.dispatchEvent(new Event('left-nav-open'))}
        >
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
        <SearchBox />
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
                  alt={auth.user.username}
                  sx={{ width: 24, height: 24 }}
                />
              }
              component={Link}
              to={`/u/${auth.user.username}`}
            >
              {auth.user.username}
            </Button>
            <PaletteModeIconButton />
            <LanguageMenu />
            <NotificationIconButton />
            <IconButton color="inherit" component={Link} to="/settings">
              <SettingsIcon />
            </IconButton>
            <LogoutIconButton />
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
            >
              {t('Login')}
            </Button>
            <Button
              variant="text"
              color="inherit"
              startIcon={<PersonAddIcon />}
              component={Link}
              to="/register"
            >
              {t('Register')}
            </Button>
          </Stack>
        )}
      </Toolbar>
    </AppBar>
  );
}
