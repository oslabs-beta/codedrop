import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#b0cdd4',
    },
    secondary: {
      light: '#fbf5ec',
      main: '#bf7472',
    },
    tertiary: {
      main: '#A88C89',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default theme;
