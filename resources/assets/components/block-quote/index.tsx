import { Typography, TypographyProps, styled } from '@mui/material';

const BlockQuote = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontStyle: 'italic',
  borderLeftWidth: 4,
  borderLeftStyle: 'solid',
  borderLeftColor: theme.palette.primary.main,
  color: theme.palette.text.secondary,
  paddingLeft: 8,
}));

export default BlockQuote;
