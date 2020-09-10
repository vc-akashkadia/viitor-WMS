import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";
import ContainerIcon from "@assests/img/container.svg";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

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
    border: "none",
    fontSize: 14,
    color:"#1f1f21",
    fontWeight: 500,
    padding: "0px 26px 0px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    width: "100%",
    height: 26,
    // display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "inline-block",
    lineHeight: "26px",
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Roboto"].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      // boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);
const useStyles = makeStyles({
  yardCard: {
    padding: 4,
    marginBottom: 8,
    "&:last-child": {
      marginBottom: 0,
    },
  },
  yardCardDamage: {
    padding: 1,
    margin: "0px -9px",
    marginBottom: 5,
    "&:last-child": {
      marginBottom: 0,
    },
  },
  damageCode: {
    backgroundColor: "#efefef",
  },
  damageCodeCnfrButton: {
    backgroundColor: "#FF0000 !important",
  },
  damageCodeButton: {
    backgroundColor: "#40d759 !important",
  },
  chipMain: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: "2px 1px",
    },
  },

  confirmBtn: {
    minWidth: 37,
    height: 26,
    color: "#fff",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "20px",
    textTransform: "uppercase",
    marginLeft: "5px",
  },
  rightBoxArrow: {
    backgroundColor: "#2991d6",
    minWidth: 28,
    height: 61,
    padding: 0,
  },
  rightBoxArrowDelete: {
    backgroundColor: "#ff0000bd",
    minWidth: 28,
    height: 56,
    color: "white",
    padding: 0,
  },
  filterSearch: {
    margin: "12px 10px",
    padding: 10,
  },
  searchTitle: {
    fontSize: 15,
    color: "#173a64",
  },
  searchInput: {
    width: "100%",
  },
  searchBtn: {
    minWidth: "100%",
    textTransform: "capitalize",
    padding: 0,
    height: 26,
  },
});
export default function CardGrid(props) {
  const classes = useStyles();
  const {
    index,
    item,
    handleOpenModal,
    handleOpenDamageModal,
    children,
    cardFor,
    handleChange,
    handleRemove,
    selectOption,
  } = props;

  return (
    <>
      {(cardFor === "gateOperation" || cardFor === "yardOperation") && (
        <Card
          key={index}
          className={
            classes.yardCard +
            " " +
            (item.damage !== "" && item.damage !== undefined
              ? classes.damageCode
              : "") +
            " " +
            (item.gateOperationCompleted ? classes.damageCode : "")
          }
          style={{ border: "1px solid #929eaa",marginLeft:"1px", marginRight:"1px" }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box className={classes.chipMain}>
              {/* <Chip
                label={item.truckNumber.substring(item.truckNumber.length - 4)}
                size="medium"
                style={{ width: 80, color: "#173a64" }}
                onClick={() => handleOpenModal("truck", item.truckNumber)}
              /> */}
              <div style={{ position: "relative" }}>
                <Chip
                  label={(item.truckNumber !== null) ? item.truckNumber.substring(
                    item.truckNumber.length - 4
                  ) : '' }
                  size="medium"
                  style={{ width: 80, color: "#000000" }}
                  onClick={() => handleOpenModal("truck", item.truckNumber)}
                />
                {/* <img src={TruckICon} alt="truck" style={{position:'absolute',top:'-11px',left:'7px',width:23}}></img> */}
                <LocalShippingOutlinedIcon
                  size="small"
                  color="action"
                  style={{
                    position: "absolute",
                    top: "-10px",
                    left: "4px",
                    width: 15,
                    color:"#0000004d"
                    // backgroundColor: "#ffffff"
                  }}
                />
              </div>
              <div style={{ position: "relative" }}>
                <Chip
                  label={(item.containerNumber !== null) ? item.containerNumber.substring(
                    item.containerNumber.length - 4
                  ) : '' }
                  onClick={() =>
                    handleOpenModal("container", item.containerNumber)
                  }
                  size="medium"
                  style={{ width: 78, color: "#000000" }}
                />
                <img
                  src={ContainerIcon}
                  alt="container"
                  style={{
                    position: "absolute",
                    top: "-5.5px",
                    left: "4px",
                    width: 13,
                  }}
                ></img>
              </div>
              <div style={{ position: "relative",width: "100%" }}>
              <Chip
                label={item.location}
                style={{ width: "100%", color: "#000000"}}
              />
              <LocationOnOutlinedIcon
                style={{
                  position: "absolute",
                  top: "-10.5px",
                  left: "4px",
                  width: 15,
                  color:"#0000004d"
                }}
                  />
              </div>
            </Box>
            <Box>
              {!item.gateOperationCompleted &&
              (item.operationCode === "GATE_IN_INBOUND" ||
                item.operationCode === "GATE_OUT_OUTBOUND") ? (
                <Button
                  className={
                    classes.rightBoxArrow +
                    "  " +
                    classes.confirmBtn +
                    " " +
                    (item.damage !== "" && item.damage !== undefined
                      ? classes.damageCodeCnfrButton
                      : classes.damageCodeButton)
                  }
                  onClick={() => handleOpenDamageModal(item, index)}
                >
                  D
                </Button>
              ) : (
                <label>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </label>
              )}
            </Box>
            {children}
          </Box>
        </Card>
      )}
      {cardFor === "damageCapture" && (
        <Card className={classes.yardCardDamage} id={item.id} key={item.id}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box className={classes.chipMain}>
              <Chip label="Code" style={{ width: "57px" }} />
              {/* <Select
                  selectedValue={item.damageCode}
                  handleChange={(value) => {
                    handleChange(value, "damageCode", item.id)
                  }}
                  options={selectOption}
                  placeholder="Select Damage Code"
                  inputStyle={<BootstrapInput />}
                  customeStyle={{ width: "70%" }}
                /> */}
              <Select
                labelId="demo-customized-select-label"
                id="demo-customized-select"
                name="damageCode"
                value={item.damageCode}
                onChange={(event) =>
                  handleChange(event.target.value, "damageCode", item.id)
                }
                input={<BootstrapInput />}
                placeholder="Block"
                style={{ width: "70%" }}
              >
                {selectOption.map((selectItem, key) => {
                  return (
                    <MenuItem
                      key={selectItem.value + "_" + key}
                      value={selectItem.value}
                    >
                      {selectItem.value}
                    </MenuItem>
                  );
                })}
              </Select>

              <Chip
                label={item.description}
                style={{ width: "203px", justifyContent: "left" }}
              />
            </Box>
            <Box
              style={{ marginLeft: "3px" }}
              onClick={(e) => handleRemove(item.id)}
            >
              <Button className={classes.rightBoxArrowDelete}>
                <DeleteForeverIcon />
              </Button>
            </Box>
          </Box>
        </Card>
      )}
    </>
  );
}
