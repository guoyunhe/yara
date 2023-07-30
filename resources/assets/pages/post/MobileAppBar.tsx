import { AppBar, Box, Stack, Toolbar, Typography } from '@mui/material';
import { PaletteModeIconButton } from 'mui-palette-mode';
import { useTranslation } from 'react-i18next';
import BackIconButton from '../../components/back-icon-button';

export default function MobileAppBar() {
  const { t } = useTranslation();

  return (
    <AppBar position="sticky" color="inherit" sx={{ zIndex: 1 }}>
      <Toolbar>
        <BackIconButton />
        <Typography fontSize={20} color="inherit" component="div">
          {t('Post')}
        </Typography>
        <Box flex="1 1 auto" />
        <Stack direction="row">
          <PaletteModeIconButton />
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
