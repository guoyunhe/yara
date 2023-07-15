import { Add } from '@mui/icons-material';
import { Button, Fab, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { NavLink, useParams } from 'react-router-dom';

export default function CreatePostButton() {
  const { t } = useTranslation();
  const { tagId } = useParams();

  const linkProps = { component: NavLink, to: tagId ? `/t/${tagId}/submit` : `/submit` };

  return (
    <>
      <Tooltip title={t('Create Post')} arrow placement="left">
        <Fab
          color="primary"
          {...linkProps}
          sx={{ display: { md: 'none' }, position: 'fixed', right: 10, bottom: 10 }}
        >
          <Add />
        </Fab>
      </Tooltip>
      <Button
        color="primary"
        variant="contained"
        startIcon={<Add />}
        {...linkProps}
        sx={{ display: { xs: 'none', md: 'inline-flex' }, mr: 2 }}
      >
        {t('Create Post')}
      </Button>
    </>
  );
}
