import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#263238',
    },
    secondary: {
      main: '#455A64',
    },
    tertiary: {
      main: '#90A4AE',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default theme;
