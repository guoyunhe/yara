import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import PostList from './PostList';

export default function PostListPage() {
  return (
    <Box sx={{ display: 'flex', flex: '1 1 auto', overflow: 'hidden' }}>
      <PostList />
      <Outlet />
    </Box>
  );
}
