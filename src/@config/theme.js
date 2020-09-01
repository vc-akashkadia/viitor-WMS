import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#5c5c5c;"
    },
    secondary: {
      main: "#ffffff"
    },
    default: {
      main: '#173a64'
    },
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
    MuiChip: {
      root: {
        backgroundColor: '#f6f6f6',
        borderRadius: 4,
        height: 26,
        fontSize: 14,
        fontWeight: 500,
        lineHeight: '26px',
        fontFamily: 'Roboto',
      }
    },
    MuiInputLabel: {
      root: { 
        "&$focused": { 
          color: "#707070"
        }
      }
    },
    MuiOutlinedInput: {
      input: {
        padding: '0px 14px',
        height: 28,
        backgroundColor: '#f6f6f6',
        borderRadius: 4
      }
    },
    MuiAppBar: {
      root: {
        boxShadow: 'none'
      }
    },
    MuiToolbar: {
      root: {
        minHeight: '40px !important'
      },
      gutters: {
        paddingLeft: 10,
        paddingRight: 10
      }
    }
  }
});

export default theme;
