import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1e88e5',
            light: '#e3f2fd',
            dark: '#3949ab',
        },
        secondary: {
            main: '#42a5f5',
            light: '#64b5f6',
        },
        success: {
            main: '#66bb6a',
            light: '#c8e6c9',
        },
        error: {
            main: '#ef5350',
            light: '#ffcdd2',
        },
        warning: {
            main: '#ffa726',
            light: '#ffe0b2',
        },
        background: {
            default: '#f5f7fa',
            paper: '#ffffff',
        },
        text: {
            primary: '#212121',
            secondary: '#757575',
        },
    },

    typography: {
        fontFamily: "'Roboto', 'Arial', sans-serif",
        h4: {
            fontWeight: 800,
            letterSpacing: '-0.5px',
        },
        h5: {
            fontWeight: 800,
            letterSpacing: '-0.3px',
        },
        h6: {
            fontWeight: 700,
        },
        subtitle1: {
            fontWeight: 700,
        },
        body1: {
            fontWeight: 500,
        },
        button: {
            textTransform: 'none',
            fontWeight: 700,
        },
    },

    shape: {
        borderRadius: 12,
    },

    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    boxShadow: '0 4px 12px rgba(30, 136, 229, 0.15)',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    textTransform: 'none',
                    fontWeight: 700,
                    padding: '10px 20px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    },
                },
                contained: {
                    background: 'linear-gradient(135deg, #1e88e5 0%, #3949ab 100%)',
                    '&:hover': {
                        background: 'linear-gradient(135deg, #1565c0 0%, #283593 100%)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
                    },
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                fullWidth: true,
                size: 'small',
            },
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 8,
                        '&:hover fieldset': {
                            borderColor: '#1e88e5',
                        },
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    fontWeight: 600,
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.1)',
                    },
                },
            },
        },
    },
});

export default theme;
