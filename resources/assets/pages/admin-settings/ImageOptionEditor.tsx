import { Upload as UploadIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, SxProps } from '@mui/material';
import { useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import ImageUpload from '../../components/image-upload';
import Image from '../../types/models/Image';
import useOption from './useOption';

export interface ImageOptionEditorProps {
  optionKey: string;
  width: number;
  height: number;
  fit: 'contain' | 'cover';
  sx?: SxProps;
}

export default function ImageOptionEditor({
  optionKey,
  width,
  height,
  fit,
  sx,
}: ImageOptionEditorProps) {
  const { t } = useTranslation('admin');
  const { value, save, saving } = useOption(optionKey);
  const { data: image } = useFetch<Image>(`/images/${value}`, { disabled: !value });
  const [uploading, setUploading] = useState(false);

  return (
    <Box sx={{ my: 2, ...sx }}>
      {image && (
        <Box
          component="img"
          src={image?.url}
          width={image?.width}
          height={image?.height}
          sx={{ display: 'block', maxWidth: '100%', height: 'auto', borderRadius: 1, mb: 1 }}
        />
      )}
      <LoadingButton
        loading={uploading || saving}
        startIcon={<UploadIcon />}
        variant="contained"
        component="label"
      >
        {t('Upload')}
        <ImageUpload
          width={width}
          height={height}
          fit={fit}
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
