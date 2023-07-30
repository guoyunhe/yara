import { useAuth } from '@guoyunhe/react-auth';
import {
  CameraAlt as CameraAltIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import ImageUpload from '../../../components/image-upload';
import Markdown from '../../../components/markdown';
import TagChips from '../../../components/tag-chips';
import TagSelect from '../../../components/tag-select';
import Image from '../../../types/models/Image';
import Tag from '../../../types/models/Tag';
import User from '../../../types/models/User';
import UserMobileAppBar from './UserMobileAppBar';

export default function UserHeader() {
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));
  const { t } = useTranslation();
  const { userId } = useParams();
  const navigate = useNavigate();
  const auth = useAuth<User>();
  const { data: user } = useFetch<User>(`/users/${userId}`);

  const canEdit = auth.user?.id === user?.id;

  const [username, setUsername] = useState('');
  const [description, setDescription] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<Image | null>(null);
  const [tags, setTags] = useState<Tag[]>([]);

  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setDescription(user.description);
      setAvatar(user.avatar || null);
      setTags(user.tags || []);
    }
  }, [user]);

  return (
    <>
      {isMobile && user && <UserMobileAppBar user={user} />}
      <Box component="header" sx={{ mb: 2 }}>
        {canEdit && (
          <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
            {editMode ? (
              <LoadingButton
                loading={saving}
                loadingPosition="start"
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={() => {
                  setSaving(true);
                  axios
                    .put('/user', { username, description, tags, avatarId: avatar?.id })
                    .then((res) => {
                      if (username !== userId) {
                        navigate(`/u/${username}`);
                      }
                      auth.setUser(res.data);
                      setEditMode(false);
                    })
                    .finally(() => {
                      setSaving(false);
                    });
                }}
              >
                {t('Save')}
              </LoadingButton>
            ) : (
              <Button
                startIcon={<EditIcon />}
                onClick={() => {
                  setEditMode(true);
                }}
              >
                {t('Edit')}
              </Button>
            )}
          </Box>
        )}
        <Box sx={{ display: 'flex', mb: 3 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar src={avatar?.url} sx={{ width: 48, height: 48 }} />
            {editMode && (
              <IconButton
                component="label"
                sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              >
                <CameraAltIcon />
                <ImageUpload onChange={setAvatar} width={256} height={256} fit="cover" />
              </IconButton>
            )}
          </Box>
          <Stack justifyContent="center" sx={{ flex: '1 1 auto', overflow: 'hidden', ml: 3 }}>
            {editMode ? (
              <TextField
                label={t('Username')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            ) : (
              <Typography variant="h3" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {username}
              </Typography>
            )}
          </Stack>
        </Box>
        {editMode ? (
          <TagSelect value={tags} onChange={setTags} sx={{ mb: 3 }} />
        ) : (
          <TagChips tags={tags} sx={{ mb: 3 }} />
        )}
        {editMode ? (
          <TextField
            label={t('Description')}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            minRows={3}
          />
        ) : (
          description && <Markdown>{description}</Markdown>
        )}
      </Box>
    </>
  );
}
