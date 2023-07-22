import { Search as SearchIcon } from '@mui/icons-material';
import { OutlinedInput } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

export default function SearchBox() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { search: searchParam } = useParams();
  const [search, setSearch] = useState(searchParam || '');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate(`/s/${encodeURIComponent(search)}`);
      }}
    >
      <OutlinedInput
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        endAdornment={<SearchIcon sx={{ pointerEvents: 'none', opacity: 0.5 }} />}
        placeholder={t('Search')}
        sx={{ mx: 2 }}
      />
    </form>
  );
}
