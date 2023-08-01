import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { PaletteModeIconButton } from 'mui-palette-mode';
import BackIconButton from '../../components/back-icon-button';
import Tag from '../../types/models/Tag';

interface MobileAppBarProps {
  tag?: Tag;
}

export default function MobileAppBar({ tag }: MobileAppBarProps) {
  return (
    <AppBar position="sticky" color="inherit" sx={{ zIndex: 1 }}>
      <Toolbar>
        <BackIconButton />
        <Avatar src={tag?.icon?.url} sx={{ width: 24, height: 24, mr: 1 }} />
        <Typography fontSize={20}>{tag?.name}</Typography>
        <Box flex="1 1 auto" />
        <PaletteModeIconButton />
        <IconButton color="inherit">
          <MoreVertIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
