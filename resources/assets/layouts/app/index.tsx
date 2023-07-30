import { Box, Theme, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import DesktopAppBar from './DesktopAppBar';
import LeftNav from './LeftNav';

// Layout of static landing pages for guests
export default function AppLayout() {
  const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'));

  return (
    <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
      <LeftNav />
      {isDesktop && <DesktopAppBar />}
      <Outlet />
    </Box>
  );
}
