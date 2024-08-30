import { useState, useEffect } from 'react';
import { ParentMessage, MessageTypes } from 'declarations/messages';

export type SelectedColors = { 
  paintStyles: PaintStyle[]; 
  variables: Variable[];
  modes: VariableCollection[];
}

export function useSelectedColors(): SelectedColors {
  const [paintStyles, setPaintStyles] = useState<PaintStyle[]>([]);
  const [variables, setVariables] = useState<Variable[]>([]);
  const [modes, setModes] = useState<VariableCollection[]>([]);

  useEffect(() => {
    function handleParentEvent(event: MessageEvent<ParentMessage>) {
      if (event.data.pluginMessage.type === MessageTypes.SET_SELECTED_COLORS) {
        setPaintStyles(event.data.pluginMessage.styles);
        setVariables(event.data.pluginMessage.variables);
        setModes(event.data.pluginMessage.modes);
      }
    }

    window.addEventListener('message', handleParentEvent);

    return () => {
      window.removeEventListener('message', handleParentEvent);
    };
  }, []);

  return { paintStyles, variables, modes };
}
