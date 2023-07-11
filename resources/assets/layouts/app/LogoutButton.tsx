import { useLogout } from '@guoyunhe/react-auth';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';

export default function LogoutButton() {
  const { t } = useTranslation();
  const logout = useLogout();

  return (
    <LoadingButton
      variant="text"
      color="inherit"
      startIcon={<LogoutIcon />}
      loading={logout.loading}
      loadingPosition="start"
      onClick={logout.submit}
      sx={{ display: { xs: 'none', sm: 'flex' } }}
    >
      {t('Logout')}
    </LoadingButton>
  );
}
