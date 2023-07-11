import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { Box, IconButton, Stack, SxProps } from '@mui/material';
import { memo, useEffect, useState } from 'react';

const fontSizeDict: Record<string, number> = {
  small: 12,
  medium: 16,
  large: 20,
};

export interface VoterProps {
  vote?: number | null;
  size?: 'small' | 'medium' | 'large';
  votesSum?: number | null;
  onVote?: (vote: number) => void;
  sx?: SxProps;
}

function Voter({ vote = 0, size = 'medium', votesSum, onVote, sx }: VoterProps) {
  const fontSize = fontSizeDict[size];
  const [voteState, setVoteState] = useState(vote || 0);

  useEffect(() => {
    setVoteState(vote || 0);
  }, [vote]);

  return (
    <Stack sx={{ alignItems: 'center', minWidth: fontSize * 4, ...sx }}>
      <IconButton
        color={voteState > 0 ? 'success' : 'inherit'}
        size={size}
        onClick={() => {
          setVoteState(voteState === 1 ? 0 : 1);
          onVote?.(voteState === 1 ? 0 : 1);
        }}
      >
        <ArrowDropUp sx={{ width: fontSize * 2, height: fontSize * 2 }} />
      </IconButton>
      <Box sx={{ fontSize }}>{(votesSum || 0) - (vote || 0) + voteState}</Box>
      <IconButton
        color={voteState < 0 ? 'error' : 'inherit'}
        size={size}
        onClick={() => {
          setVoteState(voteState === -1 ? 0 : -1);
          onVote?.(voteState === -1 ? 0 : -1);
        }}
      >
        <ArrowDropDown sx={{ width: fontSize * 2, height: fontSize * 2 }} />
      </IconButton>
    </Stack>
  );
}

export default memo(Voter);
