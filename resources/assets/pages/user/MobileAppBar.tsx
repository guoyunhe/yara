import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { PaletteModeIconButton } from 'mui-palette-mode';
import BackIconButton from '../../components/back-icon-button';
import User from '../../types/models/User';

interface MobileAppBarProps {
  user: User;
}

export default function MobileAppBar({ user }: MobileAppBarProps) {
  return (
    <AppBar position="sticky" color="inherit" sx={{ zIndex: 1 }}>
      <Toolbar>
        <BackIconButton />
        <Avatar src={user.avatar?.url} sx={{ width: 24, height: 24, mr: 1 }} />
        <Typography fontSize={20}>{user.username}</Typography>
        <Box flex="1 1 auto" />
        <PaletteModeIconButton />
        <IconButton color="inherit" edge="end">
          <MoreVertIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
