import { Box } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LeftNav from './LeftNav';
import TopNav from './TopNav';

// Layout of static landing pages for guests
export default function AppLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Box height="100vh" display="flex" flexDirection="column" overflow="hidden">
      <LeftNav drawerOpen={drawerOpen} onDrawerClose={() => setDrawerOpen(false)} />
      <TopNav onMenuButtonClick={() => setDrawerOpen((prev) => !prev)} />
      <Box sx={{ flex: '1 1 auto', overflow: 'auto' }}>
        <Outlet />
      </Box>
    </Box>
  );
}
