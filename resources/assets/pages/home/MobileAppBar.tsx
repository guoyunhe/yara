import { AuthStatus, useAuth } from '@guoyunhe/react-auth';
import { Menu as MenuIcon, Search } from '@mui/icons-material';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { PaletteModeIconButton } from 'mui-palette-mode';
import { Link } from 'react-router-dom';
import NotificationIconButton from '../../components/notification-icon-button';
import User from '../../types/models/User';

export default function HomeMobileAppBar() {
  const auth = useAuth<User>();

  return (
    <AppBar position="sticky" color="inherit" sx={{ zIndex: 1 }}>
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
        <Box flex="1 1 auto" />
        <IconButton color="inherit" component={Link} to="/s">
          <Search />
        </IconButton>
        <PaletteModeIconButton />
        {auth.status === AuthStatus.LoggedIn && auth.user ? (
          <>
            <NotificationIconButton />
          </>
        ) : (
          <></>
        )}
      </Toolbar>
    </AppBar>
  );
}
