import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import SiteLogo from './SiteLogo';
import TextOptionEditor from './TextOptionEditor';

export default function AdminSettingsPage() {
  const { t } = useTranslation('admin');

  return (
    <Container>
      <Typography variant="h1" my={3}>
        {t('Site Settings')}
      </Typography>
      <Typography variant="h2">{t('Site Information')}</Typography>
      <Typography variant="h3">{t('Site Logo')}</Typography>
      <SiteLogo />
      <Typography variant="h3">{t('Site Name')}</Typography>
      <TextOptionEditor optionKey="site_name" />
      <Typography variant="h3">{t('Site Description')}</Typography>
      <TextOptionEditor optionKey="site_description" multiline />
    </Container>
  );
}
