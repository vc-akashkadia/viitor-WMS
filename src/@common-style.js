import { makeStyles } from "@material-ui/core/styles";
const useGobalStyle = makeStyles(theme => ({
    yardTitle: {
        margin: "15px 10px 10px 10px",
        fontSize: 15,
        color: "#5c5c5c",
      },
    dividerStyle:{
        marginTop:"-5px",
        marginBottom:"1px"
    },
    refreshStyle:{
        position:'absolute',top: '-2px',right:'10px',color:"#5c5c5c"
    },
    filterSearch: {
      padding: "12px 5px 0",
      backgroundColor: "#fafafa",
      position: "fixed",
      zIndex: "1",
    },
    filterPadding:{
      padding: 10, backgroundColor:"#ffffff"
    },
      searchTitle: {
        fontSize: 15,
        color: "#5c5c5c",
      },

}))

export default useGobalStyle