import { useLogout } from '@guoyunhe/react-auth';
import { Logout as LogoutIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export default function LogoutButton() {
  const logout = useLogout();

  return (
    <IconButton
      color="inherit"
      onClick={logout.submit}
      sx={{ display: { xs: 'none', sm: 'flex' } }}
    >
      <LogoutIcon />
    </IconButton>
  );
}
