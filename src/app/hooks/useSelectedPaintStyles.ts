import { useState, useEffect } from 'react';
import { ParentMessage, MessageTypes } from '../../types/messages';

export function useSelectedPaintStyles(): PaintStyle[] {
  const [selectedPaintStyles, setSelectedPaintStyles] = useState<PaintStyle[]>([]);

  useEffect(() => {
    function handleParentEvent(event: MessageEvent<ParentMessage>) {
      if (event.data.pluginMessage.type === MessageTypes.SET_SELECTED_PAINT_STYLES) {
        setSelectedPaintStyles(event.data.pluginMessage.styles);
      }
    }

    window.addEventListener('message', handleParentEvent);

    return () => {
      window.removeEventListener('message', handleParentEvent);
    };
  }, []);

  return selectedPaintStyles;
}
