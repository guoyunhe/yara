import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import UserHeader from './user/UserHeader';

export default function PostList() {
  const { userId, postId } = useParams();

  return (
    <Box
      sx={{
        display: { xs: postId ? 'none' : 'block', md: 'block' },
        maxWidth: { md: postId ? 432 : undefined }, // limit width only in desktop two-column layout
        flex: '4 4 40%',
        overflow: 'auto',
      }}
    >
      <Box sx={{ maxWidth: 632, mx: 'auto', p: { xs: 0, md: 2 } }}>
        {userId && <UserHeader />}
        <PostList />
      </Box>
    </Box>
  );
}
