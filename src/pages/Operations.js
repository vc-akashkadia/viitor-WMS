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
import { ReactComponent as OperationIcon } from "@assests/img/yard-operation.svg";
import { ReactComponent as GateInIcon } from "@assests/img/gate-in.svg";
import { ReactComponent as GateOutIcon } from "@assests/img/gate-out.svg";
import { ReactComponent as PositionIcon } from "@assests/img/postion-update.svg";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import FormHelperText from "@material-ui/core/FormHelperText";
import {
  GetYardCraneList,
  selectYardCraneApi,
  selectLocationCraneApi,
} from "../apicalls/YardApiCalls";
import Select from "../components/Select";
import Loader from "../components/Loader";
import TitleHeader from "../components/TitleHeader";
import { constants } from "@config/constant";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 3,
    position: "relative",
    backgroundColor: "#f6f6f6",
    border: "1px solid #ced4da",
    fontSize: 14,
    color: "#1f1f21",
    padding: "0px 26px 0px 7px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    width: "100%",
    height: 26,
    display: "flex",
    alignItems: "center",
    fontFamily: ["Roboto"].join(","),
    "&:focus": {
      borderRadius: 3,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: "20px 10px 10px 10px",
    ...theme.layout.scrollbarStyles,
    height: theme.layout.mainDivHeight,
  },
  mainContainerSpacing: {
    padding: "20px 10px 10px 10px",
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
}));

const content = [
  {
    title: "Gate In",
    route: "/gate/in",
    value: constants.operation.gatein,
    img: <GateInIcon />,
    isAccordion: false,
    roleName: "ROLE_GATE",
  },
  {
    title: "Yard Operation",
    route: "/yard/operation",
    value: constants.operation.yardOperation,
    img: <OperationIcon />,
    isAccordion: true,
    roleName: "ROLE_YARD",
  },
  {
    title: "Location Update",
    route: "/location/update",
    value: constants.operation.location,
    img: <PositionIcon />,
    isAccordion: true,
    roleName: "ROLE_LOCATION_UPDATE",
  },
  {
    title: "Gate Out",
    route: "/gate/out",
    value: constants.operation.gateout,
    img: <GateOutIcon />,
    isAccordion: false,
    roleName: "ROLE_GATE",
  },
  {
    title: "Re-Print",
    route: "/reprint",
    value: constants.operation.reprint,
    img: (
      <PrintOutlinedIcon
        style={{ color: "#5c5c5c", width: "30px" }}
        fontSize="large"
      />
    ),
    isAccordion: false,
    roleName: "ROLE_GATE",
  },
];

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [showScroll, setShowScroll] = useState(true);
  const [errors, setErrors] = useState({
    [`${constants.operation.location}`]: "",
    [`${constants.operation.yardOperation}`]: "",
  });
  const [loading, setLoading] = useState(true);
  const [crane, setCrane] = useState(useSelector(({ base }) => base.yardCrane));
  const [locationCrane, setLocationCrane] = useState(
    useSelector(({ base }) => base.locationCrane)
  );
  const authToken = useSelector(({ auth }) => auth.authToken);
  const userRoles = useSelector(({ auth }) => auth.userRole);
  const facility = useSelector(({ base }) => base.facility);
  let yardCraneList = useSelector(({ base }) => base.yardCraneList);

  const handleSubmit = (event, item) => {
    event.preventDefault();
    setLoading(true);
    if (item.value !== constants.operation.location) {
      if (crane !== "") {
        dispatch(selectYardCraneApi(crane));
        setTimeout(() => {
          history.push(item.route);
        }, 500);
      } else {
        setErrors({
          yardOperation: constants.operation.craneError,
          location: "",
        });

        setLoading(false);
      }
    } else {
      if (locationCrane !== "") {
        dispatch(selectLocationCraneApi(locationCrane));
        setTimeout(() => {
          history.push(item.route);
        }, 500);
      } else {
        setErrors({
          yardOperation: "",
          location: constants.operation.craneError,
        });
        setLoading(false);
      }
    }
  };
  const handleCranselect = (type, value) => {
    if (type === constants.operation.location) {
      setLocationCrane(value);
    } else {
      setCrane(value);
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
  const scrollRef = React.createRef();

  useEffect(() => {
    console.log("ref f---------------0,",scrollRef.current.scrollHeight > scrollRef.current.clientHeight)
    if (scrollRef.current.scrollHeight > scrollRef.current.clientHeight) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  }, []);

  return (
    <div
      className={
        showScroll ? classes.mainContainer : classes.mainContainerSpacing
      }
      ref={scrollRef}
    >
      {/* <Header /> */}
      <TitleHeader
        key="operation-header"
        title={constants.operation.title}
        backPath={"/facility"}
        isSearch={false}
      />
      <div>
        {content &&
          content.map((item, index) => (
            <React.Fragment key={index}>
              {userRoles.indexOf(item.roleName) > -1 && !item.isAccordion && (
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
                        <div style={{ width: "15%" }}>{item.img}</div>
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
              {userRoles.indexOf(item.roleName) > -1 && item.isAccordion && (
                <Card className={classes.operationCard} key={item.title}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowRightIcon />}
                      aria-label="Expand"
                      aria-controls="additional-actions1-content"
                      id="additional-actions1-header"
                    >
                      <Box display="flex" alignItems="center" width="100%">
                        <div style={{ width: "15%" }}>{item.img}</div>
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
                          <FormControl
                            fullWidth
                            error={errors[`${item.value}`] !== ""}
                          >
                            <Select
                              selectedValue={
                                item.value === constants.operation.yardOperation
                                  ? crane !== ""
                                    ? crane
                                    : "none"
                                  : locationCrane !== ""
                                  ? locationCrane
                                  : "none"
                              }
                              handleChange={(value) =>
                                handleCranselect(item.value, value)
                              }
                              options={yardCraneList}
                              placeholder={"Select Crane"}
                              inputStyle={<BootstrapInput />}
                            />
                            <FormHelperText>
                              {errors[item.value]}
                            </FormHelperText>
                          </FormControl>
                          <Button
                            className={classes.operationBtn}
                            variant="contained"
                            color="primary"
                            onClick={(event) => handleSubmit(event, item)}
                          >
                            Ok
                          </Button>
                        </Box>
                      )}
                    </AccordionDetails>
                  </Accordion>
                </Card>
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
}
