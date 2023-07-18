import { Add, Save } from '@mui/icons-material';
import { Avatar, Box, Button, ButtonBase, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeleteButton from '../../components/delete-button';
import ImageUpload from '../../components/image-upload';
import Image from '../../types/models/Image';
import Tag from '../../types/models/Tag';

export interface TagEditorProps {
  tag?: Tag;
  reload?: () => void;
}

export default function TagEditor({ tag, reload }: TagEditorProps) {
  const { t } = useTranslation('admin');
  const [icon, setIcon] = useState<Image | null>(tag?.icon || null);
  const [slug, setSlug] = useState(tag?.slug || '');
  const [name, setName] = useState(tag?.name || '');

  return (
    <Box sx={{ display: 'flex', my: 2 }}>
      <ButtonBase component="label" sx={{ borderRadius: 99, mr: 2, my: -1 }}>
        <Avatar src={icon?.url} />
        <ImageUpload
          width={256}
          height={256}
          fit="cover"
          onChange={(image) => {
            setIcon(image);
          }}
        />
      </ButtonBase>
      <TextField
        label={t('Slug')}
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        sx={{ mr: 2 }}
      />
      <TextField
        label={t('Name')}
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ flex: '1 1 auto', mr: 2 }}
      />
      <Button
        color="success"
        variant="contained"
        startIcon={tag ? <Save /> : <Add />}
        onClick={() => {
          const data = { iconId: icon?.id || null, icon, slug, name };
          if (tag) {
            axios.put(`/admin/tags/${tag.id}`, data).then(() => {
              reload?.();
            });
          } else {
            axios.post('/admin/tags', data).then(() => {
              reload?.();
              setIcon(null);
              setSlug('');
              setName('');
            });
          }
        }}
        sx={{ mr: 2 }}
      >
        {tag ? t('Update') : t('Create')}
      </Button>
      {tag && (
        <DeleteButton
          url={`/admin/tags/${tag.id}`}
          onSucceed={() => {
            reload?.();
          }}
        />
      )}
    </Box>
  );
}
