import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import ImageUpload from '../../components/image-upload';
import Image from '../../types/models/Image';
import useOption from './useOption';

export default function SiteLogo() {
  const { t } = useTranslation('admin');
  const { value, save, saving } = useOption('site_logo');
  const { data: image } = useFetch<Image>(`/images/${value}`, { disabled: !value });
  const [uploading, setUploading] = useState(false);
  return (
    <Box>
      {value && <Box component="img" src={image?.url} />}
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
            save(image.id);
          }}
        />
      </LoadingButton>
    </Box>
  );
}
