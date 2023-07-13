import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Box, IconButton, Stack, SxProps } from '@mui/material';
import { memo, useEffect, useState } from 'react';

const fontSizeDict: Record<string, number> = {
  small: 12,
  medium: 16,
  large: 20,
};

export interface LikerProps {
  like?: number | null;
  size?: 'small' | 'medium' | 'large';
  likesSum?: number | null;
  onLike?: (like: number) => void;
  sx?: SxProps;
}

function Liker({ like = 0, size = 'medium', likesSum, onLike, sx }: LikerProps) {
  const fontSize = fontSizeDict[size];
  const [likeState, setLikeState] = useState(like || 0);

  useEffect(() => {
    setLikeState(like || 0);
  }, [like]);

  return (
    <Stack sx={{ alignItems: 'center', minWidth: fontSize * 4, ...sx }}>
      <IconButton
        color={likeState > 0 ? 'success' : 'inherit'}
        size={size}
        onClick={() => {
          setLikeState(likeState === 1 ? 0 : 1);
          onLike?.(likeState === 1 ? 0 : 1);
        }}
      >
        <ArrowDropUp sx={{ width: fontSize * 2, height: fontSize * 2 }} />
      </IconButton>
      <Box sx={{ fontSize }}>{(likesSum || 0) - (like || 0) + likeState}</Box>
      <IconButton
        color={likeState < 0 ? 'error' : 'inherit'}
        size={size}
        onClick={() => {
          setLikeState(likeState === -1 ? 0 : -1);
          onLike?.(likeState === -1 ? 0 : -1);
        }}
      >
        <ArrowDropDown sx={{ width: fontSize * 2, height: fontSize * 2 }} />
      </IconButton>
    </Stack>
  );
}

export default memo(Liker);
