import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { EmojiEmotions } from '@mui/icons-material';
import { IconButton, Popover, SxProps } from '@mui/material';
import { usePaletteMode } from 'mui-palette-mode';
import { useState } from 'react';

export interface EmojiPickerProps {
  onSelect?: (emoji: any) => void;
  sx?: SxProps;
}

export default function EmojiPicker({ onSelect, sx }: EmojiPickerProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const { paletteMode } = usePaletteMode();

  return (
    <>
      <IconButton onClick={(e) => setAnchor(e.currentTarget)} sx={sx}>
        <EmojiEmotions />
      </IconButton>
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Picker
          data={data}
          onEmojiSelect={(emoji: any) => {
            onSelect?.(emoji);
            setAnchor(null);
          }}
          theme={paletteMode}
        />
      </Popover>
    </>
  );
}
