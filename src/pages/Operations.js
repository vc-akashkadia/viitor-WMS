import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import OperationIcon from "@assests/img/dashboard1.svg";
import GateInIcon from "@assests/img/gate-in.svg";
import GateOutIcon from "@assests/img/gate-out.svg";
import PositionIcon from "@assests/img/postion-update.svg";
import Header from "../components/Header";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import FormHelperText from "@material-ui/core/FormHelperText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";


import { GetYardCraneList, selectYardCraneApi } from "../apicalls/YardApiCalls";
const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#f6f6f6",
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "0px 26px 0px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    width: "100%",
    height: 28,
    display: 'flex',
    alignItems: 'center',
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "inline-block",
    lineHeight: "28px",
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Roboto"].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles({
  mainContainer: {
    margin: "13px 10px 13px 10px",
  },
  mainTitle: {
    paddingLeft: 14,
  },
  operationDetails: {
    width: "100%",
    display: "flex",
  },
  operationBtn: {
    minWidth: 31,
    marginLeft: 5,
  },
  operationCard: {
    marginBottom: 10,
    "&:last-child": {
      marginBottom: 0,
    },
  },
});

const content = [
  {
    title: "Location Update",
    route: "/location/update",
    img:PositionIcon
  },
  {
    title: "Gate In",
    route: "/gate/in",
    img:GateInIcon
  },
  {
    title: "Gate Out",
    route: "/gate/out",
    img:GateOutIcon
  },
];

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [crane, setCrane] = useState("");
  const authToken = useSelector(({ auth }) => auth.authToken);
  const facility = useSelector(({ base }) => base.facility);
  let yardCraneList = useSelector(({ base }) => base.yardCraneList);
  const dispatch = useDispatch();
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    if (crane !== "") {
      dispatch(selectYardCraneApi(crane));
      setTimeout(() => {
        history.push("/yard/operation");  
      }, 500);
      
    } else {
      setErrors("Please Select Crane");
      setLoading(false);
    }
  };
  const handleCallBackYardCraneList = (response) => {
    const {
      data: { status },
    } = response;
    if (status) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (yardCraneList.length === 0) {
      dispatch(
        GetYardCraneList(facility, authToken, handleCallBackYardCraneList)
      );
      setLoading(false);
    }
  }, []);
  
  return (
    <>
      {/* <Header /> */}


      <AppBar position="static" color="secondary">
        <Toolbar>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            style={{ width: "100%" }}
          >
            <Box display="flex" alignItems="center">
              <IconButton
                aria-label="back"
                className={classes.backIcon}
                size="small"
                onClick={() => history.push("/facility")}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography className={classes.backText}>
                 Operations
              </Typography>
            </Box>
            {/* <Box display="flex" alignItems="center" onClick={handleFilterOpen}>
              <IconButton
                aria-label="back"
                className={classes.backIcon}
                size="small"
                style={{ paddingRight: 10 }}
              >
                {!open && <SearchIcon /> }
                {open && <CloseIcon /> }
              </IconButton>
              {/* <IconButton
                aria-label="back"
                className={classes.backIcon}
                size="small"
              >
                <FilterListIcon />
              </IconButton> */}
            {/* </Box> */} 
          </Box>
        </Toolbar>
      </AppBar>

      <div className={classes.mainContainer}>
        <Card className={classes.operationCard}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowRightIcon />}
              aria-label="Expand"
              aria-controls="additional-actions1-content"
              id="additional-actions1-header"
            >
              <Box display="flex" alignItems="center">
                <img src={OperationIcon} alt="" />
                <Typography color="primary" className={classes.mainTitle}>
                  Yard Operation
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box className={classes.operationDetails}>
                <FormControl fullWidth error={errors !== ""}>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={crane}
                      onChange={(e) => setCrane(e.target.value)}
                    input={<BootstrapInput />}
                    placeholder="Select Yard Crane"
                    style={{ width: "100%" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {yardCraneList.map((item) => (
                        <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                      ))}
                    
                  </Select>
                  <FormHelperText>{errors}</FormHelperText>
                </FormControl>
                <Button
                  className={classes.operationBtn}
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Ok
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Card>
        {content &&
          content.map((item) => (
            <Card 
            key={item.title}
              className={classes.operationCard}
              onClick={() => history.push(item.route)}
              style={{ cursor: "pointer" }}
            >
              <Accordion>
                <AccordionSummary
                  expandIcon={<ArrowRightIcon />}
                  aria-label="Expand"
                  aria-controls="additional-actions1-content"
                  id="additional-actions1-header"
                >
                  <Box display="flex" alignItems="center">
                    <img src={item.img} alt="" />
                    <Typography color="primary" className={classes.mainTitle}>
                      {item.title}
                    </Typography>
                  </Box>
                </AccordionSummary>
              </Accordion>
            </Card>
          ))}
      </div>
    </>
  );
}
