import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { CssVarsProvider } from '@mui/joy/styles';
import { theme } from 'utils/theme';

function Root() {
  return (
    <CssVarsProvider theme={theme}>
      <App />
    </CssVarsProvider>
  );
}

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('plugin');
  const root = createRoot(container);
  root.render(<Root />);
});
