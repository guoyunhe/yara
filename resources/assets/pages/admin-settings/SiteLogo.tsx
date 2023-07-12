import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ImageUpload from '../../components/image-upload';
import useOption from './useOption';

export default function SiteLogo() {
  const { t } = useTranslation('admin');
  const { value, save, saving, error } = useOption('site_logo');
  const [uploading, setUploading] = useState(false);
  return (
    <Box>
      {value && <Box component="img" src={value?.url} />}
      <LoadingButton loading={uploading || saving} variant="contained" component="label">
        {t('Upload')}
        <ImageUpload
          width={256}
          height={256}
          fit="cover"
          onUpload={() => setUploading(true)}
          onFail={() => setUploading(false)}
          onChange={(image) => {
            setUploading(false);
            save(image);
          }}
        />
      </LoadingButton>
    </Box>
  );
}
