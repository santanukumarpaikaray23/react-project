export default {
  typography: {
    // In Japanese the characters are usually larger.
    // fontFamily: `Ubuntu`,
    fontSize: 12,
  },
  palette: {
    primary: {
      main: "#2FC9B9",
      contrastText: "#fff",
    },
    secondary:{
      main:"#101d6c",
      contrastText: "#fff",
    },
    error:{
      main:"#f44336",
      contrastText: "#fff",
    },
  },
  overrides: {
    // Style sheet name ⚛️
    MuiCardContent: {
      // Name of the rule
      root: {
        // Some CSS
        padding: '8px 8px 8px 8px !important',
      },
    },
    MuiButton:{
      root:{
        margin:"4px",
        width:"220px"
      }
    },
    MuiTextField:{
      root:{
        margin:"4px 0px 4px 0px"
      },
    },
    MuiTypography:{
      root:{
        // margin:"4px"
      },
    },
    MuiFormLabel:{
      root:{
        color:"black",
        margin:"10px 0px 10px 4px",
        fontWeight:400
      }
    },
    MuiStepper:{
      root:{
        padding:"35px"
      }
    },
    MuiAvatar:{
      root:{
        width:"90%",height:"90%"
      }
    }
  },
}
