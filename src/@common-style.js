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
        margin: "12px 5px",
        padding: 10,
        position: "fixed",
        backgroundColor: "#ffff",
        zIndex: "2",
      },
      searchTitle: {
        fontSize: 15,
        color: "#5c5c5c",
      },

}))

export default useGobalStyle