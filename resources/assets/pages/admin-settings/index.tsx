import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SiteLogo from './SiteLogo';

export default function AdminSettingsPage() {
  const { t } = useTranslation('admin');

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" my={3}>
        {t('Site Settings')}
      </Typography>
      <Typography variant="h2">{t('Site Information')}</Typography>
      <Typography variant="h3">{t('Site Logo')}</Typography>
      <SiteLogo />
      <Typography variant="h3">{t('Site Name')}</Typography>
      <Typography variant="h3">{t('Site Description')}</Typography>
    </Container>
  );
}
