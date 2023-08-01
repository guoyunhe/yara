import { Avatar, Box, Theme, Typography, useMediaQuery } from '@mui/material';
import { useFetch } from 'react-fast-fetch';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Tag from '../../types/models/Tag';
import MobileAppBar from './MobileAppBar';

export default function Header() {
  const { t } = useTranslation();
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'));
  const { tagId } = useParams();
  const { data: tag } = useFetch<Tag>(`/tags/${tagId}`);

  return (
    <>
      {isMobile ? (
        <MobileAppBar tag={tag} />
      ) : (
        <Box component="header" sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar src={tag?.icon?.url} sx={{ mr: 1 }} />
          <Box>
            <Typography variant="h3">{tag?.name}</Typography>
            <Typography variant="caption">
              {t(`{{usersCount}} users, {{postsCount}} posts`, {
                usersCount: tag?.usersCount || 0,
                postsCount: tag?.postsCount || 0,
              })}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
}
