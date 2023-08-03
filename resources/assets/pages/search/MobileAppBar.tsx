import { MoreVert as MoreVertIcon, Search as SearchIcon } from '@mui/icons-material';
import { AppBar, Box, IconButton, OutlinedInput, Toolbar } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import BackIconButton from '../../components/back-icon-button';

export default function MobileAppBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const [search, setSearch] = useState(params.search || '');
  return (
    <AppBar position="sticky" color="inherit" sx={{ zIndex: 1 }}>
      <Toolbar>
        <BackIconButton />
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/s/${encodeURIComponent(search)}`);
          }}
          sx={{ flex: '1 1 auto' }}
        >
          <OutlinedInput
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            endAdornment={<SearchIcon sx={{ pointerEvents: 'none', opacity: 0.5 }} />}
            placeholder={t('Search')}
            fullWidth
          />
        </Box>
        <IconButton color="inherit" edge="end">
          <MoreVertIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
