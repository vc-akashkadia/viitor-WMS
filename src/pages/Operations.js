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

import FormControl from "@material-ui/core/FormControl";

import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import OperationIcon from "@assests/img/dashboard1.svg";
import GateInIcon from "@assests/img/gate-in.svg";
import GateOutIcon from "@assests/img/gate-out.svg";
import PositionIcon from "@assests/img/postion-update.svg";

import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import FormHelperText from "@material-ui/core/FormHelperText";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import IconButton from "@material-ui/core/IconButton";
import { GetYardCraneList, selectYardCraneApi } from "../apicalls/YardApiCalls";
import Select from "../components/Select";
import Loader from "../components/Loader";
import TitleHeader from "../components/TitleHeader"

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
    fontSize: 14,
    color:"#1f1f21",
    padding: "0px 26px 0px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    width: "100%",
    height: 26,
    display: "flex",
    alignItems: "center",
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
    margin: "20px 10px 10px 10px",
  },
  mainTitle: {
    paddingLeft: 14,
  },
  operationDetails: {
    width: "100%",
    display: "flex",
  },
  operationBtn: {
    textTransform: "capitalize",
    padding: 0,
    height: 28,
    minWidth: 39,
    marginLeft: 4,
  },
  headerDiv: {
    width: "100%",
    margin: "0px 43px",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bolder",
  },
  operationCard: {
    marginBottom: 10,
    "&:last-child": {
      marginBottom: 0,
    },
  },
  accordiondetails: {
    padding: "0px 11px 7px 10px",
  },
});

const content = [
  {
    title: "Gate In",
    route: "/gate/in",
    img: GateInIcon,
    isAccordion: false,
  },
  {
    title: "Yard Operation",
    route: "",
    img: OperationIcon,
    isAccordion: true,
  },
  {
    title: "Location Update",
    route: "/location/update",
    img: PositionIcon,
    isAccordion: false,
  },
  {
    title: "Gate Out",
    route: "/gate/out",
    img: GateOutIcon,
    isAccordion: false,
  },
];

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(true);
  const [crane, setCrane] = useState(useSelector(({ base }) => base.yardCrane));
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
    } else {
    }
    setLoading(false);
  };
  const getCraneList = () => {
    dispatch(
      GetYardCraneList(facility, authToken, handleCallBackYardCraneList)
    );
    setLoading(true);
  };
  useEffect(getCraneList, []);

  return (
    <>
      {/* <Header /> */}
      <TitleHeader
        key="operation-header"
        title="Operations"
        backPath={"/facility"}
        isSearch={false}
      />

      <div className={classes.mainContainer}>
        {content &&
          content.map((item) => (
            <>
              {!item.isAccordion && (
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
                      <Box display="flex" alignItems="center" width="100%">
                        <div style={{ width: "15%" }}>
                          <img src={item.img} alt="" />
                        </div>
                        <div style={{ width: "70%" }}>
                          <Typography
                            color="primary"
                            className={classes.mainTitle}
                          >
                            {item.title}
                          </Typography>
                        </div>
                      </Box>
                    </AccordionSummary>
                  </Accordion>
                </Card>
              )}
              {item.isAccordion && (
                <Card className={classes.operationCard} key={item.title}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowRightIcon />}
                      aria-label="Expand"
                      aria-controls="additional-actions1-content"
                      id="additional-actions1-header"
                    >
                      <Box display="flex" alignItems="center" width="100%"  >
                        <div style={{ width: "15%" }}>
                          <img src={item.img} alt="" />
                        </div>
                        <div style={{ width: "70%" }}>
                          <Typography
                            color="primary"
                            className={classes.mainTitle}
                          >
                            {item.title}
                          </Typography>
                        </div>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordiondetails}>
                      {loading && <Loader />}
                      {!loading && (
                        <Box className={classes.operationDetails}>
                          <FormControl fullWidth error={errors !== ""}>
                            <Select
                              selectedValue={crane !== "" ? crane : "none"}
                              handleChange={setCrane}
                              options={yardCraneList}
                              placeholder="Select Yard Crane"
                              inputStyle={<BootstrapInput />}
                            />
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
                      )}
                    </AccordionDetails>
                  </Accordion>
                </Card>
              )}
            </>
          ))}
      </div>
    </>
  );
}
