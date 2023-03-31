import { useColorScheme } from '@mui/joy/styles';
import { useMutationObserver } from 'rooks';

const htmlRef = {
  current: document.getElementsByTagName('html')[0],
};

export enum Mode {
  light = 'light',
  dark = 'dark',
}

function getModeFromHTMLTag(): Mode {
  return htmlRef.current.classList.contains('figma-dark') ? Mode.dark : Mode.light;
}

export function useMuiMode(): void {
  const { mode, setMode } = useColorScheme();

  useMutationObserver(
    htmlRef,
    () => {
      const htmlTagMode = getModeFromHTMLTag();

      if (htmlTagMode !== mode) {
        setMode(htmlTagMode);
      }
    },
    {
      attributes: true,
      subtree: false,
      childList: false,
    }
  );
}
