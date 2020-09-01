import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#5c5c5c;"
    },
    secondary: {
      main: "#ffffff"
    }
  },
  status: {
    danger: "orange"
  },
  typography: {
    fontFamily: "Roboto",
    fontSize: 14,
    lineHeight: '16px',
    fontWeight: "500",
    htmlFontSize: 16,
    body1: {
      fontSize: 14,
      fontWeight: "500",
      lineHeight: '16px',
    }
  },
  props: {
    MuiTypography: {
      variantMapping: {
        subtitle1: "p",
        subtitle2: "span"
      }
    },
  },
  overrides: {
    MuiPaper: {
      elevation1: {
        boxShadow: '0 1px 4px #e2e9ef',
        borderRadius: 6,
        backgroundColor: '#ffffff'
      }
    },
    MuiAccordionSummary: {
      root: {
        padding: '0 12px'
      },
      expandIcon: {
        backgroundColor: '#f6f6f6',
        padding: 0,
        marginRight: 0
      }
    },
    MuiAccordionDetails: {
      root: {
        padding: 12
      }
    },
    MuiButton: {
      containedPrimary: {
        backgroundColor: '#0c79c1',
        borderRadius: 5,
        fontFamily: 'Roboto',
        fontSize: 13,
        fontWeight: 400,
        lineHeight: '16px',
        textTransform: 'uppercase',
      }
    },
    MuiInputLabel: {
      root: { 
        "&$focused": { 
          color: "#707070"
        }
      }
    }
  }
});

export default theme;
