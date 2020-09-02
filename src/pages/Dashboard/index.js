import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import Button from "@material-ui/core/Button";
import OperationIcon from "./../../@assests/img/dashboard1.svg";
import Header from "../../components/Header";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import { useHistory } from "react-router-dom";

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
    margin: "65px 10px",
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
    title: "Position Update",
    route: "/position",
  },
  {
    title: "Gate In",
    route: "/position",
  },
  {
    title: "Gate Out",
    route: "/position",
  },
];

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <>
      <Header />
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
                <FormControl fullWidth>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={age}
                    onChange={handleChange}
                    input={<BootstrapInput />}
                    placeholder="Select Yard Crane"
                    style={{ width: "100%" }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  className={classes.operationBtn}
                  variant="contained"
                  color="primary"
                  onClick={()=>{history.push("/yard/operation")}}
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
                    <img src={OperationIcon} alt="" />
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
