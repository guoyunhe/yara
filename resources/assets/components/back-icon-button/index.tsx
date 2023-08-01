import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function BackIconButton() {
  const navigate = useNavigate();

  return (
    <IconButton
      edge="start"
      color="inherit"
      onClick={() => {
        if (history.state.idx > 0) {
          navigate(-1);
        } else {
          navigate('/');
        }
      }}
    >
      <ArrowBackIcon />
    </IconButton>
  );
}
