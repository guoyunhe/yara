import { Box, SxProps } from '@mui/material';
import { blue } from '@mui/material/colors';
import { usePaletteMode } from 'mui-palette-mode';
import { Highlight, themes } from 'prism-react-renderer';
import { Fragment, MutableRefObject, useCallback, useRef } from 'react';
import { Edit, useEditable } from 'use-editable';

export interface MarkdownCodeEditorProps {
  editRef?: MutableRefObject<Edit | null>;
  value: string;
  onChange?: (value: string) => void;
  sx?: SxProps;
}

export default function MarkdownCodeEditor({
  editRef,
  value,
  onChange,
  sx,
}: MarkdownCodeEditorProps) {
  const { paletteMode } = usePaletteMode();
  const editorRef = useRef(null);

  const onEditableChange = useCallback(
    (code: string) => {
      onChange?.(code.slice(0, -1)); // fix line break issues
    },
    [onChange]
  );

  const edit = useEditable(editorRef, onEditableChange, {
    disabled: false,
    indentation: 2,
  });

  if (editRef) {
    editRef.current = edit;
  }

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
          sx={{
            ...style,
            margin: 0,
            padding: '13px',
            borderRadius: 1,
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
            backgroundColor: undefined,
            color: 'inherit',
            outline: 'none',
            '&:hover': {
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? '#fff' : 'rgba(0, 0, 0, 0.87)',
            },
            '&:focus': {
              borderColor: (theme) => (theme.palette.mode === 'dark' ? blue[200] : blue[700]),
              borderWidth: 2,
              padding: '12px',
            },
            ...sx,
          }}
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
