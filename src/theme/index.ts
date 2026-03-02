import { createTheme, type Direction } from '@mui/material/styles';

const MDA_RED = '#ED1C24';
const MDA_RED_DARK = '#C41920';
const MDA_WHITE = '#FFFFFF';

export function createAppTheme(direction: Direction) {
  return createTheme({
    direction,
    palette: {
      primary: {
        main: MDA_RED,
        dark: MDA_RED_DARK,
        contrastText: MDA_WHITE,
      },
      secondary: {
        main: MDA_WHITE,
        contrastText: MDA_RED,
      },
      background: {
        default: '#F5F5F5',
        paper: MDA_WHITE,
      },
    },
    typography: {
      fontFamily: '"Rubik", "Helvetica", "Arial", sans-serif',
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none' },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'box-shadow 0.2s, transform 0.2s',
            '&:hover': {
              boxShadow: '0 4px 20px rgba(237, 28, 36, 0.15)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
    },
  });
}
