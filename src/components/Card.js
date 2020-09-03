import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
const useStyles = makeStyles({
    
    yardCard: {
      padding: 12,
      marginBottom: 15,
      "&:last-child": {
        marginBottom: 0,
      },
    },
    damageCode: {
      backgroundColor: "#efefef",
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
      marginLeft: "5px",
    },
    rightBoxArrow: {
      backgroundColor: "#2991d6",
      minWidth: 28,
      height: 61,
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
    const classes = useStyles()
    const {index,item,handleOpenModal,handleOpenDamageModal,children} = props
  
    return (
      
        <Card
        key={index}
        className={
          classes.yardCard +
          " " +
          (item.damage !== "" && item.damage !== undefined
            ? classes.damageCode
            : "")
        }
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box className={classes.chipMain}>
            <Chip
              label={item.truckNumber.substring(
                item.truckNumber.length - 4
              )}
              size="medium"
              style={{ width: 80 }}
              onClick={() => handleOpenModal("truck", item.truckNumber)}
            />
            <Chip
              label={item.containerNumber.substring(
                item.containerNumber.length - 4
              )}
              onClick={() =>
                handleOpenModal("container", item.containerNumber)
              }
              size="medium"
              style={{ width: 80 }}
            />
            <Chip label={item.location} style={{ width: "75%" }} />
            {(item.operationCode === "GATE_IN_INBOUND" ||
              item.operationCode === "GATE_OUT_OUTBOUND") && (
              <Button
                className={classes.confirmBtn}
                onClick={() => handleOpenDamageModal(item)}
              >
                D
              </Button>
            )}
          </Box>
          {children}
        </Box>
      </Card>
  
    );
  }
  