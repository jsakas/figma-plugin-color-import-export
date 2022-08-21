import React from 'react';
import { Paint as PaintComponent, solidPaintToColor } from './Paint';

import './App.css';
import { useSelectedPaintStyles } from '../hooks/useSelectedPaintStyles';
import { isSolidPaint } from '../../utils/guards';

function download(text, name, type) {
  const a = document.createElement('a');
  const file = new Blob([text], { type: type });
  a.href = URL.createObjectURL(file);
  a.download = name;

  a.click();
}

function App() {
  const selectedPaintStyles = useSelectedPaintStyles();

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      {selectedPaintStyles?.length === 0 ? (
        <div>Select some colors...</div>
      ) : (
        <div
          style={{
            width: '100%',
          }}
        >
          <div>{selectedPaintStyles?.length} paint styles selected</div>

          <button
            onClick={() => {
              const obj = selectedPaintStyles.reduce((acc, style) => {
                const ps = style.paints[0];

                if (isSolidPaint(ps)) {
                  acc[style.name] = solidPaintToColor(ps).toString();
                }

                return acc;
              }, {});

              download(JSON.stringify(obj, null, 2), 'colors.json', 'application/json');
            }}
          >
            Export
          </button>

          {selectedPaintStyles.map((style) => {
            return (
              <div
                key={style.id}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  marginBottom: 5,
                }}
              >
                <PaintComponent paint={style.paints[0]} style={{ marginRight: 5 }} />
                {style.name}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
