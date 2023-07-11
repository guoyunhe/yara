import { Avatar, Box, SxProps } from '@mui/material';
import { Link } from 'react-router-dom';
import User from '../../types/models/User';

export interface UserBriefProps {
  user: User;
  avatarSize?: number;
  disabled?: boolean;
  sx?: SxProps;
}

export default function UserBrief({ user, avatarSize = 20, disabled, sx }: UserBriefProps) {
  const linkProps = disabled ? {} : { component: Link, to: `/u/${user.username}` };
  return (
    <Box
      component="span"
      {...linkProps}
      sx={{
        ...sx,
        color: 'inherit',
        textDecoration: 'none',
      }}
    >
      <Avatar
        component="span"
        src={user.avatar?.url}
        sx={{
          display: 'inline-flex',
          width: avatarSize,
          height: avatarSize,
          mr: '0.25em',
          my: -avatarSize / 16,
          verticalAlign: 'middle',
        }}
      />
      {user.username}
    </Box>
  );
}
