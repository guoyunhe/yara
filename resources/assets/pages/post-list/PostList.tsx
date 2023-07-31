import { Box } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function PostList() {
  const { postId } = useParams();

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
        <PostList />
      </Box>
    </Box>
  );
}
