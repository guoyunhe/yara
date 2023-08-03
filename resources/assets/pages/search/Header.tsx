import { Theme, useMediaQuery } from '@mui/material';
import MobileAppBar from './MobileAppBar';

export default function Header() {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));
  return <>{isMobile && <MobileAppBar />}</>;
}
