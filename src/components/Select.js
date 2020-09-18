import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 3,
    position: "relative",
    color: "#1f1f21",
    backgroundColor: "#f6f6f6",
    border: "1px solid #ced4da",
    fontSize: 14,
    padding: "0px 26px 0px 7px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    width: "100%",
    height: 28,
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
export default function SelectDropdown(props) {
  const {
    selectedValue,
    handleChange,
    options,
    placeholder,
    inputStyle,
    customeStyle,
  } = props;
  return (
    <>
      <Select
        labelId="demo-customized-select-label"
        id="demo-customized-select"
        value={selectedValue}
        onChange={(e) => handleChange(e.target.value)}
        input={inputStyle !== undefined ? inputStyle : <BootstrapInput />}
        placeholder={placeholder}
        style={customeStyle === undefined ? { width: "100%" } : customeStyle}
        defaultValue="none"
      >
        {placeholder && (
          <MenuItem value="none" disabled>
            {placeholder}
          </MenuItem>
        )}
        {options.map((item, key) => (
          <MenuItem key={item.value + "_" + key} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
