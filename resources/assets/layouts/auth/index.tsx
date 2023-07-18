import { RedirectAfterAuth } from '@guoyunhe/react-auth';
import { Box, Paper, Tab, Tabs, Toolbar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import BackIconButton from '../../components/back-icon-button';

// Layout for login and register page.
export default function AuthLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Toolbar>
        <BackIconButton />
      </Toolbar>
      <Box
        sx={{
          flex: '1 1 auto',
          py: 3,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper elevation={9} sx={{ flex: '0 1 400px' }}>
          <Tabs
            value={location.pathname}
            onChange={(_e, value) => {
              navigate(value);
            }}
            variant="fullWidth"
          >
            <Tab label={t('Login')} value="/login" />
            <Tab label={t('Register')} value="/register" />
          </Tabs>
          <RedirectAfterAuth to="/" />
          <Outlet />
        </Paper>
      </Box>
    </Box>
  );
}
