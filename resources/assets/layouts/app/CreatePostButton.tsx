import { Create } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

export default function CreatePostButton() {
  const { t } = useTranslation();
  const { tagId } = useParams();

  return (
    <Button
      variant="contained"
      startIcon={<Create />}
      component={NavLink}
      to={tagId ? `/t/${tagId}/submit` : `/submit`}
    >
      {t('Create Post')}
    </Button>
  );
}
