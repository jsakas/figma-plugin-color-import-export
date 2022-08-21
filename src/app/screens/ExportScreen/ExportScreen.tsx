import React, { useMemo } from 'react';
import { Paint as PaintComponent, solidPaintToColor } from 'app/components/Paint';
import { useTheme } from '@mui/joy/styles';

import { useSelectedPaintStyles } from 'app/hooks/useSelectedPaintStyles';
import { isSolidPaint } from 'utils/guards';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';

function download(text, name, type) {
  const a = document.createElement('a');
  const file = new Blob([text], { type: type });
  a.href = URL.createObjectURL(file);
  a.download = name;

  a.click();
}

export function ExportScreen() {
  const theme = useTheme();

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
    <Box width="100%" height="100%">
      <Box sx={{ marginBottom: 2 }}>
        <Typography level="body1" component="h1" fontWeight="semibold" marginBottom="2">
          Selection
        </Typography>

        {hasSelected ? (
          <Box display="grid" gridTemplateColumns="repeat(auto-fill, 25px)" gap="5px">
            {selectedPaintStyles.map((style) => {
              return <PaintComponent key={style.id} paint={style.paints[0]} />;
            })}
          </Box>
        ) : (
          <Typography level="body3">No colors selected</Typography>
        )}
      </Box>

      <Typography level="body1" component="h1" fontWeight="semibold">
        Export Format
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        gap="5px"
        marginTop={theme.spacing(1)}
        marginBottom={theme.spacing(2)}
      >
        <Checkbox label="JSON" />
        <Checkbox label="CSS" />
        <Checkbox label="Sass" />
        <Checkbox label="JavaScript" />
      </Box>

      <Box sx={{ marginBottom: 2 }}>
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
            navigator.clipboard.writeText(JSON.stringify(styleObject, null, 2)).then(console.log).catch(console.error);
          }}
        >
          Copy to Clipboard
        </Button>
      </Box>
    </Box>
  );
}
