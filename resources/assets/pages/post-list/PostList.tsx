import { Box, List, ListItemButton, ListItemText, Pagination } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { Link, useParams } from 'react-router-dom';
import Liker from '../../components/liker';
import RelativeTime from '../../components/relative-time';
import UserBrief from '../../components/user-brief';
import Paginated from '../../types/Paginated';
import Post from '../../types/models/Post';

export default function PostList() {
  const { tagId = '', postId } = useParams();
  const [page, setPage] = useState(1);
  const { data: posts } = useFetch<Paginated<Post>>(`/posts?tagId=${tagId}&page=${page}`);
  const totalPage = posts ? Math.ceil(posts.meta.total / posts.meta.perPage) : 1;
  return (
    <Box sx={{ overflow: 'auto' }}>
      <List dense disablePadding sx={{ flex: '0 0 300px', overflow: 'auto' }}>
        {posts?.data.map((post) => (
          <ListItemButton
            key={post.id}
            divider
            selected={postId === post.id.toString()}
            component={Link}
            to={tagId ? `/t/${tagId}/p/${post.id}` : `/p/${post.id}`}
            sx={{ alignItems: 'stretch' }}
          >
            <Liker
              like={post.likes?.[0]?.like}
              likesSum={post.likesSum}
              onLike={(like) => {
                axios.post(`/posts/${post.id}/likes`, { like });
              }}
              size="small"
              sx={{ ml: -2 }}
            />
            <ListItemText
              primary={post.title}
              primaryTypographyProps={{ flex: '1 1 auto' }}
              secondary={
                <Box component="span" display="flex">
                  <UserBrief user={post.user} disabled />
                  <Box component="span" flexGrow="1" />
                  <Box component="span">
                    <RelativeTime date={post.createdAt} />
                  </Box>
                </Box>
              }
              sx={{ display: 'flex', flexDirection: 'column' }}
            />
          </ListItemButton>
        ))}
      </List>
      <Pagination count={totalPage} page={page} onChange={(_e, p) => setPage(p)} sx={{ my: 3 }} />
    </Box>
  );
}
