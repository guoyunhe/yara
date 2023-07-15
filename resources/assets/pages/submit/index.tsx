import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Container, Divider, Grid, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Markdown from '../../components/markdown';
import TagChips from '../../components/tag-chips';
import TagSelect from '../../components/tag-select';
import Post from '../../types/models/Post';
import Tag from '../../types/models/Tag';

export default function SubmitPage() {
  const { t } = useTranslation();
  const { postId, tagId } = useParams();
  const navigate = useNavigate();

  const { data: tag } = useFetch<Tag>(`/tags/${tagId}`, { disabled: !tagId });
  const { data: post } = useFetch<Post>(`/posts/${postId}`, { disabled: !postId });

  const [tags, setTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (post) {
      setTags(post.tags);
      setTitle(post.title);
      setContent(post.content);
    } else if (tag) {
      setTags([tag]);
    }
  }, [tag?.id, post?.id]);

  return (
    <Box sx={{ overflow: 'auto' }}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h1" sx={{ my: 3 }}>
              {post ? t('Update Post') : t('Create Post')}
            </Typography>
            <TagSelect value={tags} onChange={setTags} sx={{ mb: 3 }} />
            <TextField
              label={t('Title')}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              autoFocus
              sx={{ mb: 3 }}
            />
            <TextField
              label={t('Content')}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              multiline
              minRows={5}
              sx={{ mb: 3 }}
            />
            <LoadingButton
              loading={submitting}
              loadingPosition="start"
              variant="contained"
              startIcon={<Save />}
              onClick={() => {
                setSubmitting(true);
                const data = {
                  title,
                  content,
                  tags,
                };
                const promise = post
                  ? axios.put<Post>(`/posts/${post.id}`, data)
                  : axios.post<Post>('/posts', data);
                promise
                  .then((res) => {
                    navigate(tagId ? `/t/${tagId}/p/${res.data.id}` : `/p/${res.data.id}`);
                  })
                  .finally(() => {
                    setSubmitting(false);
                  });
              }}
              sx={{ mb: 3 }}
            >
              {t('Submit')}
            </LoadingButton>
          </Grid>
          <Grid item xs={12} md={6}>
            <Divider sx={{ display: { xs: 'block', md: 'none' } }} />
            <Typography variant="h1" sx={{ my: 3 }}>
              {t('Preview Post')}
            </Typography>
            <TagChips tags={tags} disabled sx={{ mb: 3 }} />
            <Typography variant="h1" sx={{ mb: 3 }}>
              {title}
            </Typography>
            <Markdown>{content}</Markdown>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
