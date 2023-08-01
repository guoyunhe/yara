import { Box } from '@mui/material';
import { Outlet, useParams } from 'react-router-dom';
import PostList from '../../components/post-list';
import Header from './Header';

export default function TagPage() {
  const { postId } = useParams();

  return (
    <Box sx={{ display: 'flex', flex: '1 1 auto', overflow: 'hidden' }}>
      <Box
        sx={{
          display: { xs: postId ? 'none' : 'block', md: 'block' },
          maxWidth: { md: postId ? 432 : undefined }, // limit width only in desktop two-column layout
          flex: '4 4 40%',
          overflow: 'auto',
        }}
      >
        <Box sx={{ maxWidth: 632, mx: 'auto', p: { xs: 0, md: 2 } }}>
          <Header />
          <PostList />
        </Box>
      </Box>
      <Outlet />
    </Box>
  );
}
