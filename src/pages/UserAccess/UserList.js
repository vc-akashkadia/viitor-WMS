import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import EditIcon from '@material-ui/icons/Edit';
import TitleHeader from "../../components/TitleHeader"
import ScrollToTop from "../../components/ScrollToTop"
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditUserModal from "./EditModal"


const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
  },
  yardTitle: {
    margin: "12px 10px",
    fontSize: 15,
    color: "#173a64",
  },
  yardCard: {
    padding: 5,
    marginBottom: 5,
    "&:last-child": {
      marginBottom: 0,
    },
  },
  chipMain: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "2px 1px",
    },
  },
  confirmBtn: {
    backgroundColor: "#40d759",
    minWidth: 37,
    height: 26,
    color: "#fff",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "20px",
    textTransform: "uppercase",
  },
  filterSearch: {
    margin: "1px 1px",
    padding: 10,
    position: 'fixed',
    backgroundColor:"#ffff",
    zIndex:"2"
  },
 
  searchInput: {
    width: "100%",
  },
  input: {
    padding: "0px 5px",
  },
  searchBtn: {
    minWidth: "100%",
    textTransform: "capitalize",
    padding: 0,
    height: 26,
  },
}));



export default function YardOperation(props) {
  const classes = useStyles();
//   const history = useHistory();
  const [open, setOpen] = useState(false);
  const [gModal, setGModal] = useState(false);
  const [type,setType]=useState()
  const handleGModal =(type)=>{
    setGModal(true)
    setType(type)
  }

  
  return (
    <>
      <TitleHeader open={open} setOpen={setOpen} title={"User Access"} backPath={"/facility"}/>
      {open && (
        <Card className={classes.filterSearch}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={6}>
              <Typography className={classes.searchTitle}>
                Search Here
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                className={classes.searchInput}
                id="outlined-basic"
                placeholder="Enter No."
                label=""
                variant="outlined"
              />
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                color="primary"
                className={classes.searchBtn}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Card>
      )}
      <div className={classes.yardMain} style={open ?{marginTop:"82px"}:{marginTop:"0px"}}>
        <div style={{position:'relative'}}>
        <Typography className={classes.yardTitle}>User List</Typography>
        <AddCircleIcon style={{position:'absolute',top: '-5px',right:'10px',color:"#173a64"}}  onClick={()=>handleGModal("add")}/>
        </div>
        <Card className={classes.yardCard} style={{ border: "1px solid #929eaa",marginLeft:"2px", marginRight:"2px" }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box className={classes.chipMain}>
              <Chip label="John"  style={{ width: "107px" }}/>
              <Chip label="Baxter Chennai"    style={{ width:"112px" }} />
              <Chip label="Gate"  size="large"  style={{ width:"90px" }} />
              <Chip label="Yard"  size="large"  style={{ width:"90px" }} />
              <Button
                className={classes.confirmBtn}
                onClick={()=>handleGModal("edit")}
              >
                <EditIcon fontSize="small"/>
              </Button>
            </Box>
          </Box>
        </Card>
      </div>
      <ScrollToTop />
      {gModal &&( <EditUserModal open={gModal} setOpen={setGModal} type={type} api={"Location Api"} data={"LOC1234"} />)}
    </>
  );
}
