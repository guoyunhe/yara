import { Box, Pagination, SxProps } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useParams } from 'react-router-dom';
import Paginated from '../../types/Paginated';
import Post from '../../types/models/Post';
import PostCard from '../post-card';

export interface PostListProps {
  sx?: SxProps;
}

export default function PostList({ sx }: PostListProps) {
  const { userId, tagId, search } = useParams();

  const [page, setPage] = useState(1);

  const apiSearchParams = new URLSearchParams();
  apiSearchParams.set('page', String(page));
  if (tagId) {
    apiSearchParams.set(Number.isInteger(Number(tagId)) ? `tagId` : `tagSlug`, tagId);
  }
  if (userId) {
    apiSearchParams.set(Number.isInteger(Number(userId)) ? `userId` : `username`, userId);
  }
  if (search) {
    apiSearchParams.set('search', search);
  }

  const { data: posts, reload } = useFetch<Paginated<Post>>(`/posts?${apiSearchParams.toString()}`);
  const totalPage = posts?.meta ? Math.ceil(posts.meta.total / posts.meta.perPage) : 1;

  useEffect(() => {
    window.addEventListener('post-list-reload', reload);
    return () => {
      window.removeEventListener('post-list-reload', reload);
    };
  }, [reload]);

  return (
    <Box sx={sx}>
      {posts?.data.map((post) => (
        <PostCard key={post.id} post={post} sx={{ mb: 2 }} />
      ))}
      <Pagination count={totalPage} page={page} onChange={(_e, p) => setPage(p)} sx={{ my: 3 }} />
    </Box>
  );
}
