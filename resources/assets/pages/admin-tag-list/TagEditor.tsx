import { Avatar, Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ImageUpload from '../../components/image-upload';
import Image from '../../types/models/Image';
import Tag from '../../types/models/Tag';

export interface TagEditorProps {
  tag?: Tag;
  onDone?: () => void;
}

export default function TagEditor({ tag, onDone }: TagEditorProps) {
  const { t } = useTranslation('admin');
  const [icon, setIcon] = useState<Image | null>(tag?.icon || null);
  const [slug, setSlug] = useState(tag?.slug || '');
  const [name, setName] = useState(tag?.name || '');

  return (
    <Box sx={{ display: 'flex' }}>
      <label>
        <Avatar src={icon?.url} />
        <ImageUpload
          width={256}
          height={256}
          fit="cover"
          onChange={(image) => {
            setIcon(image);
          }}
        />
      </label>
      <TextField label={t('Slug')} value={slug} onChange={(e) => setSlug(e.target.value)} />
      <TextField label={t('Name')} value={name} onChange={(e) => setName(e.target.value)} />
      <Button
        onClick={() => {
          const data = { iconId: icon?.id, icon, slug, name };
          if (tag) {
            axios.put(`/admin/tags/${tag.id}`, data).then(() => {
              onDone?.();
            });
          } else {
            axios.post('/admin/tags', data).then(() => {
              onDone?.();
              setIcon(null);
              setSlug('');
              setName('');
            });
          }
        }}
      >
        {tag ? t('Update') : t('Create')}
      </Button>
      {tag && <Button>{t('Delete')}</Button>}
    </Box>
  );
}
