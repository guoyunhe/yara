import { Box, Pagination } from '@mui/material';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useParams } from 'react-router-dom';
import Paginated from '../../types/Paginated';
import Post from '../../types/models/Post';
import PostCard from './PostCard';

export default function PostList() {
  const { tagId = '', postId } = useParams();
  const [page, setPage] = useState(1);
  const { data: posts } = useFetch<Paginated<Post>>(`/posts?tagId=${tagId}&page=${page}`);
  const totalPage = posts ? Math.ceil(posts.meta.total / posts.meta.perPage) : 1;
  return (
    <Box
      sx={{
        display: { xs: postId ? 'none' : 'block', md: 'block' },
        maxWidth: { md: postId ? 400 : undefined }, // limit width only in desktop two-column layout
        flex: '4 4 40%',
        overflow: 'auto',
      }}
    >
      <Box sx={{ maxWidth: 632, mx: 'auto', p: { xs: 0, md: 2 } }}>
        {posts?.data.map((post) => (
          <PostCard key={post.id} post={post} sx={{ mb: 2 }} />
        ))}
        <Pagination count={totalPage} page={page} onChange={(_e, p) => setPage(p)} sx={{ my: 3 }} />
      </Box>
    </Box>
  );
}
