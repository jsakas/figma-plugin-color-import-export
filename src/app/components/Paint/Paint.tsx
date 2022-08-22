import React, { useMemo } from 'react';
import { isSolidPaint } from 'utils/guards';
import { useColorScheme, useTheme } from '@mui/joy/styles';
import { solidPaintToColor } from 'utils/color';

type PaintComponentProps = {
  paint: Paint;
  style?: React.CSSProperties;
  className?: string;
};

export function Paint(props: PaintComponentProps): JSX.Element {
  const { mode } = useColorScheme();
  const theme = useTheme();
  const { paint, style = {}, className } = props;

  const shouldShowBorder = useMemo(() => {
    if (isSolidPaint(paint)) {
      if (mode === 'dark') {
        return paint.color.r < 0.03 && paint.color.g < 0.03 && paint.color.b < 0.03;
      }

      if (mode === 'light') {
        return paint.color.r > 0.97 && paint.color.g > 0.97 && paint.color.b > 0.97;
      }
    }

    return false;
  }, [paint]);

  if (isSolidPaint(paint)) {
    const backgroundColor = solidPaintToColor(paint).toString();

    return (
      <div
        className={className}
        style={{
          width: 25,
          height: 25,
          borderRadius: '50%',
          backgroundColor,
          boxSizing: 'border-box',
          border: shouldShowBorder ? `1px solid ${theme.palette.divider}` : 'none',
          ...style,
        }}
      />
    );
  }

  return null;
}
