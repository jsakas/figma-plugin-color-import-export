import React from 'react';
import Color from 'color';
import { isSolidPaint } from 'utils/guards';

type PaintComponentProps = {
  paint: Paint;
  style?: React.CSSProperties;
  className?: string;
};

export function solidPaintToColor(paint: SolidPaint): Color {
  return Color({
    r: paint.color.r * 255,
    g: paint.color.g * 255,
    b: paint.color.b * 255,
  }).alpha(Number(paint.opacity.toFixed(2)));
}

export function Paint(props: PaintComponentProps): JSX.Element {
  const { paint, style = {}, className } = props;

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
          ...style,
        }}
      />
    );
  }

  return null;
}
