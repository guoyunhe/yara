import { Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ImageOptionEditor from './ImageOptionEditor';
import TextOptionEditor from './TextOptionEditor';

export default function AdminSettingsPage() {
  const { t } = useTranslation('admin');

  return (
    <Container maxWidth="md">
      <Typography variant="h1" my={3}>
        {t('Site Settings')}
      </Typography>
      <Typography variant="h2">{t('Site Information')}</Typography>
      <Typography variant="h3">{t('Site Logo')}</Typography>
      <ImageOptionEditor
        optionKey="site_logo"
        width={256}
        height={256}
        fit="cover"
        sx={{ mb: 3 }}
      />
      <Typography variant="h3">{t('Site Name')}</Typography>
      <TextOptionEditor optionKey="site_name" />
      <Typography variant="h3">{t('Site Description')}</Typography>
      <TextOptionEditor optionKey="site_description" multiline />
    </Container>
  );
}
