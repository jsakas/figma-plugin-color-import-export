import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  fontFamily: {
    body: 'Inter, sans-serif',
  },
});

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
