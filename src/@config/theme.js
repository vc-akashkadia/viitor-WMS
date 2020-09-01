import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#007bff"
    },
    secondary: {
      main: "#eff0f3"
    },
    default: {
      main: "#000000"
    },
    white: {
      main: "#e0e0e0"
    },
    background:{
      default: "#e0e0e0"
    }
  },
  status: {
    danger: "orange"
  },
  typography: {
    fontFamily: "Varela Round",
    fontSize: 16,
    lineHeight: "28px",
    fontWeight: "400",
    htmlFontSize: 16,
    h1: {
      fontSize: "7.5rem",
      fontWeight: 800,
      lineHeight: "7.5rem",
      "@media (max-width:1024px)": {
        fontSize: "7rem",
        lineHeight: "7rem"
      },
      "@media (max-width:767px)": {
        fontSize: "3rem",
        lineHeight: "3.5rem"
      }
    },
    h2: {
      fontSize: "5rem",
      fontWeight: 400,
      lineHeight: "5.6rem",
      "@media (max-width:1024px)": {
        fontSize: "3.6rem",
        lineHeight: "4.6rem"
      },
      "@media (max-width:991px)": {
        fontSize: "2.6rem",
        lineHeight: "3.6rem"
      },
      "@media (max-width:767px)": {
        fontSize: "2rem",
        lineHeight: "46px"
      }
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 400,
      lineHeight: "46px",
      "@media (max-width:1024px)": {
        fontSize: "1.8rem",
        lineHeight: "40px"
      },
      "@media (max-width:767px)": {
        fontSize: "1.5rem",
        lineHeight: "36px"
      }
    },
    h4: {
      fontSize: "1.125rem",
      fontWeight: 500
    },
    h5: {
      fontSize: "1.3rem",
      fontWeight: 300,
      lineHeight: "30px",
      "@media (max-width:767px)": {
        fontSize: "1.125rem"
      }
    },
    h6: {
      fontSize: "0.93rem",
      fontWeight: 400,
      lineHeight: "24px"
    },
    subtitle1: {
      fontSize: "1.125rem",
      lineHeight: "28px",
      "@media (max-width:767px)": {
        fontSize: "1rem"
      }
    },
    // h2 font for number text
    subtitle2: {
      fontSize: "9.37rem",
      fontWeight: 700,
      lineHeight: "150px",
      "@media (max-width:1024px)": {
        fontSize: "7rem",
        lineHeight: "100px"
      },
      "@media (max-width:767px)": {
        fontSize: "5rem",
        lineHeight: "80px"
      }
    },
    body1: {
      fontSize: "1.125rem",
      color: "grey",
      "@media (max-width:767px)": {
        fontSize: "1rem"
      }
    }
  },
  props: {
    MuiTypography: {
      variantMapping: {
        subtitle1: "p",
        subtitle2: "span"
      }
    }
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 5,
        fontSize: "1.125rem",
        lineHeight: "28px",
        textTransform: "capitalize",
        textDecoration: "none",
        "&:hover": {
          color: "#ffffff",
          backgroundColor: "#252f6a"
        }
      },
      contained:{
        backgroundColor:"#0d79c1",
        color:"#ffffff"
      },
      outlined: {
        padding: "6px 30px",
        border: "1px solid #252f6a",
        "@media (max-width:1200px)": {
          "&:hover": {
            color: "#ffffff",
            backgroundColor: "#252f6a !important"
          }
        },
        "@media (max-width:767px)": {
          padding: "4px 25px",
          fontSize: "1rem"
        }
      },
      outlinedPrimary: {
        border: "1px solid #252f6a",
        "&:hover": {
          backgroundColor: "#252f6a"
        }
      }
    },
    MuiListItem: {
      root: {
        "&$selected": {
          backgroundColor: "#252f6a",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#252f6a"
          }
        }
      },
      gutters: {
        paddingLeft: 30,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0
      }
    },
    MuiMenuItem: {
      root: {
        padding: "0 20px"
      }
    },
    MuiDialog: {
      paper: {
        overflowY: "inherit",
        zIndex: 2
      }
    },
    MuiTooltip: {
      popper: {
        zIndex: 1
      },
      tooltip: {
        fontSize: "0.87rem",
        color: "#ffffff",
        backgroundColor: "#252f6a",
        top: 10
      },
      arrow: {
        color: "#252f6a"
      }
    },
    MuiList: {
      root: {},
      padding: {
        paddingTop: 0,
        paddingBottom: 0
      }
    },
    MuiAutocomplete: {
      root: {},
      inputRoot: {
        marginTop: "19px !important"
      }
    }
  },
});

export default theme;
