import { Box, SxProps } from '@mui/material';
import { usePaletteMode } from 'mui-palette-mode';
import { Highlight, themes } from 'prism-react-renderer';
import { Fragment, useCallback, useRef } from 'react';
import { useEditable } from 'use-editable';

export interface MarkdownCodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  sx?: SxProps;
}

export default function MarkdownCodeEditor({ value, onChange, sx }: MarkdownCodeEditorProps) {
  const { paletteMode } = usePaletteMode();
  const editorRef = useRef(null);

  const onEditableChange = useCallback(
    (code: string) => {
      onChange?.(code.slice(0, -1)); // fix line break issues
    },
    [onChange]
  );

  useEditable(editorRef, onEditableChange, {
    disabled: false,
    indentation: 2,
  });

  return (
    <Highlight
      code={value}
      language="markdown"
      theme={paletteMode === 'dark' ? themes.nightOwl : themes.nightOwlLight}
    >
      {({ className, style, tokens, getTokenProps }) => (
        <Box
          component="pre"
          className={className}
          sx={{ ...style, margin: 0, p: 2, borderRadius: 1, outline: 'none', ...sx }}
          ref={editorRef}
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        >
          {tokens.map((line, i) => (
            <Fragment key={i}>
              {line
                .filter((token) => !token.empty)
                .map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              {'\n'}
            </Fragment>
          ))}
        </Box>
      )}
    </Highlight>
  );
}
