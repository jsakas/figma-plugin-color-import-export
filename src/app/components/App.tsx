import React, { useMemo } from 'react';
import { Paint as PaintComponent, solidPaintToColor } from './Paint';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

import { useSelectedPaintStyles } from '../hooks/useSelectedPaintStyles';
import { isSolidPaint } from '../../utils/guards';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';

const theme = extendTheme({
  fontFamily: {
    body: 'Inter, sans-serif',
  },
});

function download(text, name, type) {
  const a = document.createElement('a');
  const file = new Blob([text], { type: type });
  a.href = URL.createObjectURL(file);
  a.download = name;

  a.click();
}

function App() {
  const selectedPaintStyles = useSelectedPaintStyles();

  const hasSelected = useMemo(() => selectedPaintStyles?.length > 0, [selectedPaintStyles?.length]);

  const styleObject = useMemo(() => {
    return selectedPaintStyles.reduce((acc, style) => {
      const ps = style.paints[0];

      if (isSolidPaint(ps)) {
        acc[style.name] = solidPaintToColor(ps).toString();
      }

      return acc;
    }, {});
  }, [selectedPaintStyles]);

  return (
    <CssVarsProvider theme={theme}>
      <Box width="100%" height="100%">
        <Box sx={{ marginBottom: 2 }}>
          <Typography level="body1" component="h1" fontWeight="semibold" marginBottom="2">
            Selection
          </Typography>

          {hasSelected ? (
            <Box display="grid" gridTemplateColumns="repeat(auto-fill, 25px)" gap="5px">
              {selectedPaintStyles.map((style) => {
                return <PaintComponent paint={style.paints[0]} />;
              })}
            </Box>
          ) : (
            <Typography level="body3">No colors selected</Typography>
          )}
        </Box>
        <Box sx={{ marginBottom: 2 }}>
          <Typography level="body1" component="h1" fontWeight="semibold">
            Export Format
          </Typography>
          <Button
            sx={{ marginTop: 1 }}
            disabled={!hasSelected}
            variant="solid"
            fullWidth
            size="sm"
            onClick={() => {
              download(JSON.stringify(styleObject, null, 2), 'colors.json', 'application/json');
            }}
          >
            Export Colors
          </Button>
          <Button
            sx={{ marginTop: 1 }}
            disabled={!hasSelected}
            variant="outlined"
            fullWidth
            size="sm"
            onClick={() => {
              navigator.clipboard
                .writeText(JSON.stringify(styleObject, null, 2))
                .then(console.log)
                .catch(console.error);
            }}
          >
            Copy to Clipboard
          </Button>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}

export default App;
