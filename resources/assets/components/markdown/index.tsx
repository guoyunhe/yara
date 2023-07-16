import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ComponentType, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const components: Record<string, ComponentType> = {
  h1: (props) => <Typography variant="h1" {...props} />,
  h2: (props) => <Typography variant="h2" {...props} />,
  h3: (props) => <Typography variant="h3" {...props} />,
  p: (props) => <Typography variant="body1" mb={1} {...props} />,
  pre: (props) => (
    <Box
      sx={(theme) => ({
        borderRadius: 2,
        px: 2,
        py: 1.25,
        fontSize: 14,
        backgroundColor: theme.palette.mode === 'dark' ? grey[900] : grey[100],
      })}
      component="pre"
      {...props}
    />
  ),
};

export interface MarkdownProps {
  children: string;
}

function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
      {children}
    </ReactMarkdown>
  );
}

export default memo(Markdown);
