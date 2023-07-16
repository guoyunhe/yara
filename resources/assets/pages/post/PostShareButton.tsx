import { Share } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Post from '../../types/models/Post';

export interface PostShareButtonProps {
  post: Post;
}

export default function PostShareButton({ post }: PostShareButtonProps) {
  const { t } = useTranslation();
  const [sharing, setSharing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <>
      <LoadingButton
        loading={sharing}
        loadingPosition="start"
        startIcon={<Share />}
        onClick={() => {
          setSharing(true);
          navigator
            .share({
              title: post.title,
              text: post.title,
              url: `/p/${post.id}`,
            })
            .then(() => {
              setSucceeded(true);
            })
            .catch(() => {
              setFailed(true);
            })
            .finally(() => {
              setSharing(false);
            });
        }}
      >
        {t('Share')}
      </LoadingButton>
      <Snackbar open={succeeded} autoHideDuration={6000} onClose={() => setSucceeded(false)}>
        <Alert severity="success" elevation={6} variant="filled" sx={{ width: '100%' }}>
          {t('Shared successfully')}
        </Alert>
      </Snackbar>
      <Snackbar open={failed} autoHideDuration={6000} onClose={() => setFailed(false)}>
        <Alert severity="error" elevation={6} variant="filled" sx={{ width: '100%' }}>
          {t('Failed to share')}
        </Alert>
      </Snackbar>
    </>
  );
}
