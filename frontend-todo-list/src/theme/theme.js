import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
        main: '#1976d2',
        },
        secondary: {
        main: '#9c27b0',
        },
        background: {
        default: '#f5f5f5',
        },
    },

    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        h5: {
        fontWeight: 600,
        },
        button: {
        textTransform: 'none',
        fontWeight: 500,
        },
    },

    shape: {
        borderRadius: 12,
    },

    components: {
        MuiButton: {
        styleOverrides: {
            root: {
            borderRadius: 12,
            },
        },
        },
        MuiCard: {
        styleOverrides: {
            root: {
            borderRadius: 16,
            padding: '1rem',
            },
        },
        },
        MuiTextField: {
        defaultProps: {
            fullWidth: true,
            size: 'small',
        },
        },
    },
});

export default theme;
