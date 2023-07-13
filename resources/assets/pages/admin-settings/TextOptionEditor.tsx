import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useOption from './useOption';

interface TextOptionEditorProps {
  optionKey: string;
  multiline?: boolean;
}

export default function TextOptionEditor({ optionKey, multiline }: TextOptionEditorProps) {
  const { t } = useTranslation('admin');
  const { value, save, saving, error } = useOption(optionKey);
  const [state, setState] = useState(value);

  useEffect(() => {
    setState(value);
  }, [value]);

  return (
    <Box sx={{ display: 'flex' }}>
      <TextField
        value={state}
        onChange={(e) => setState(e.target.value)}
        fullWidth
        multiline
        sx={{ mr: 2 }}
      />
      <LoadingButton
        loading={saving}
        loadingPosition="start"
        variant="contained"
        startIcon={<Save />}
        onClick={() => save(state)}
      >
        {t('Save')}
      </LoadingButton>
    </Box>
  );
}
