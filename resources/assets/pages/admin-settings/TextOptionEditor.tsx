import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, SxProps, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useOption from './useOption';

interface TextOptionEditorProps {
  optionKey: string;
  multiline?: boolean;
  sx?: SxProps;
}

export default function TextOptionEditor({ optionKey, multiline, sx }: TextOptionEditorProps) {
  const { t } = useTranslation('admin');
  const { value, save, saving } = useOption(optionKey);
  const [state, setState] = useState(value);

  useEffect(() => {
    setState(value);
  }, [value]);

  return (
    <Box sx={{ display: 'flex', my: 2, ...sx }}>
      <TextField
        value={state}
        onChange={(e) => setState(e.target.value)}
        multiline={multiline}
        sx={{ flex: '1 1 auto', mr: 2 }}
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
