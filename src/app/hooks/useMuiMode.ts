import { useColorScheme } from '@mui/joy/styles';
import { Mode } from '@mui/system/build/cssVars/useCurrentColorScheme';
import { useMutationObserver } from 'rooks';

const htmlRef = {
  current: document.getElementsByTagName('html')[0],
};

function getModeFromHTMLTag(): Mode {
  return htmlRef.current.classList.contains('figma-dark') ? 'dark' : 'light';
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
