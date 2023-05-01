import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { CssVarsProvider } from '@mui/joy/styles';
import { theme } from 'utils/theme';
import { Sentry } from './integrations/Sentry';
import { ErrorBoundary } from './components/ErrorBoundary';
import CssBaseline from '@mui/joy/CssBaseline';

function Root() {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary onError={Sentry.captureException}>
        <App />
      </ErrorBoundary>
    </CssVarsProvider>
  );
}

Sentry.captureMessage('Plugin loaded', {
  tags: {
    version: PACKAGE_VERSION,
  },
});

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('plugin');
  const root = createRoot(container);
  root.render(<Root />);
});
