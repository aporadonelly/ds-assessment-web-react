import { ThemeOptions, createTheme } from "@mui/material/styles";

const theme = createTheme();

export default createTheme(theme, {
  components: {
    MuiInputBase: {
      defaultProps: {
        size: "small",
      },
    },
    MuiAlert: {
      styleOverrides: {
        filledError: {
          backgroundColor: "#ef5350",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: "none",
        size: "small",
        fullWidth: true,
        InputLabelProps: {
          shrink: true,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: theme.typography.fontWeightBold,
          textTransform: "none",
        },
      },
      defaultProps: {
        variant: "contained",
        disableElevation: true,
      },
    },
  },
} as ThemeOptions);