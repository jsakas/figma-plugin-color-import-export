import React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

import { ExportScreen } from 'app/screens/ExportScreen/ExportScreen';

const theme = extendTheme({
  fontFamily: {
    body: 'Inter, sans-serif',
  },
});

function App() {
  return (
    <CssVarsProvider theme={theme}>
      <ExportScreen />
    </CssVarsProvider>
  );
}

export default App;
