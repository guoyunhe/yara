import { Share } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Post from '../../types/models/Post';

export interface PostShareButtonProps {
  post: Post;
}

export default function PostShareButton({ post }: PostShareButtonProps) {
  const { t } = useTranslation();
  const [sharing, setSharing] = useState(false);

  return (
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
          .finally(() => {
            setSharing(false);
          });
      }}
    >
      {t('Share')}
    </LoadingButton>
  );
}
