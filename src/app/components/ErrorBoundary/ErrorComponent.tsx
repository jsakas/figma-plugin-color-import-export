import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import React, { ErrorInfo } from 'react';
import Link from '@mui/joy/Link';
import styled from '@emotion/styled';

export type ErrorComponentProps = {
  error?: Error;
  errorInfo?: ErrorInfo;
};

const StyledPre = styled.pre`
  overflow: auto;
`;

export function ErrorComponent(props: ErrorComponentProps): JSX.Element {
  const { error, errorInfo } = props;
  return (
    <Box display="flex" alignItems="center" justifyContent="center" width="100%" height="100%">
      <Box textAlign="center" padding="10" width="100%">
        <Typography level="h1" component="div">
          😓
        </Typography>
        <Typography level="h4" component="h1">
          An unexpected error has occured
        </Typography>
        <Typography level="body2">
          Please open an issue on{' '}
          <Link href="https://github.com/jsakas/figma-plugin-color-import-export" target="_blank">
            GitHub
          </Link>
          .
        </Typography>
        <Typography level="body3" fontFamily="monospace">
          <StyledPre>
            {error?.toString()}
            {errorInfo?.componentStack}
          </StyledPre>
        </Typography>
      </Box>
    </Box>
  );
}
