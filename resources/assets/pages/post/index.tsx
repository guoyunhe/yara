import { AuthStatus, useAuth, useRequireAuth } from '@guoyunhe/react-auth';
import { Close, Edit, Reply } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DeleteButton from '../../components/delete-button';
import Liker from '../../components/liker';
import Markdown from '../../components/markdown';
import RelativeTime from '../../components/relative-time';
import TagChips from '../../components/tag-chips';
import UserBrief from '../../components/user-brief';
import Comment from '../../types/models/Comment';
import Post from '../../types/models/Post';
import User from '../../types/models/User';
import isElementInViewport from '../../utils/isElementInViewport';
import CommentContainer from './CommentContainer';
import PostShareButton from './PostShareButton';

export default function PostPage() {
  const { t } = useTranslation();
  const { user, status } = useAuth<User>();
  const requireAuth = useRequireAuth();
  const { postId, tagId } = useParams();
  const navigate = useNavigate();
  const commentFormContainerRef = useRef<HTMLElement>(null);

  const {
    data: post,
    remove: removePost,
    loading: postLoading,
  } = useFetch<Post>(`/posts/${postId}`);

  const [newComments, setNewComments] = useState<Comment[]>([]);
  const [commentOrder, setCommentOrder] = useState('like');

  useEffect(() => {
    if (post?.comments) {
      setNewComments(post.comments);
    }
  }, [post?.comments]);

  const createComment = useCallback(
    (comment: Comment) => setNewComments((prev) => [comment, ...prev]),
    []
  );

  const updateComment = useCallback(
    (comment: Comment) =>
      setNewComments((prev) => prev.map((item) => (item.id === comment.id ? comment : item))),
    []
  );

  const deleteComment = useCallback(
    (comment: Comment) => setNewComments((prev) => prev.filter((item) => item.id !== comment.id)),
    []
  );

  if (!post || postLoading) {
    return (
      <Box
        component="article"
        sx={{ flex: '6 6 60%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const canEdit =
    status === AuthStatus.LoggedIn && (user?.id === post.userId || user?.role === 'admin');

  return (
    <Box component="article" sx={{ flex: '6 6 60%', overflow: 'auto' }}>
      <IconButton
        component={Link}
        to={tagId ? `/t/${tagId}` : `/`}
        sx={{ display: { xs: 'inline-block', md: 'none' } }}
      >
        <Close />
      </IconButton>

      <Box component="header" sx={{ display: 'flex' }}>
        <Box sx={{ flex: '0 0 auto' }}>
          <Liker
            like={post.likes?.[0]?.like}
            likesSum={post.likesSum}
            onLike={(like) => {
              if (requireAuth()) {
                axios.post(`/posts/${post.id}/likes`, { like });
              }
            }}
            sx={{ mt: 6 }}
          />
        </Box>

        <Box sx={{ flex: '1 1 auto', pr: 2, maxWidth: 816 }}>
          <TagChips tags={post.tags} sx={{ my: 3 }} />

          <Typography variant="h1" mb={2}>
            {post.title}
          </Typography>

          <Stack direction="row" spacing={2}>
            <UserBrief user={post.user} avatarSize={32} />
            <RelativeTime date={post.createdAt} />
          </Stack>

          <Markdown>{post.content}</Markdown>

          <Divider sx={{ mt: 3, mb: 1 }} />
          <Stack direction="row">
            <Button
              startIcon={<Reply />}
              onClick={() => {
                if (requireAuth()) {
                  if (commentFormContainerRef.current) {
                    commentFormContainerRef.current.querySelector('textarea')?.focus();
                    if (!isElementInViewport(commentFormContainerRef.current)) {
                      commentFormContainerRef.current.scrollIntoView(false);
                    }
                  }
                }
              }}
            >
              {t('Reply')} ({post.commentsCount})
            </Button>
            {canEdit && (
              <Button startIcon={<Edit />} component={Link} to={`/p/${post.id}/edit`}>
                {t('Edit')}
              </Button>
            )}
            <PostShareButton post={post} />
            {canEdit && (
              <DeleteButton
                url={`/posts/${post.id}`}
                onSucceed={() => {
                  navigate('/');
                  removePost();
                }}
              />
            )}
          </Stack>
        </Box>
      </Box>

      <CommentContainer />
    </Box>
  );
}
