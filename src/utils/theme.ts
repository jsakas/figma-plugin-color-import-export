import { deepmerge } from '@mui/utils';
import { experimental_extendTheme as extendMuiTheme } from '@mui/material/styles';
import { extendTheme as extendJoyTheme } from '@mui/joy/styles';

const muiTheme = extendMuiTheme({
  cssVarPrefix: 'joy',
});

const joyTheme = extendJoyTheme({
  fontFamily: {
    body: 'Inter, sans-serif',
  },
});

const theme = deepmerge(muiTheme, joyTheme);

export { theme };
