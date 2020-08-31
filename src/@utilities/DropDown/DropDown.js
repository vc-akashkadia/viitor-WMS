import React from "react";
import { emphasize, makeStyles, useTheme } from "@material-ui/core/styles";
import Select from "react-select";

const useStyles2 = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 250,
  },
  input: {
    display: "flex",
    padding: 0,
    height: "auto",
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  chip: {
    margin: theme.spacing(0.5, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: theme.spacing(1, 2),
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: "absolute",
    left: 2,
    bottom: 6,
    fontSize: 16,
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
}));

export default function DropDown({
  type,
  options,
  name,
  id,
  selected,
  label,
  customClasses,
  ...props
}) {
  const classes2 = useStyles2();
  const theme = useTheme();

  const selectStyles = {
    input: (base) => ({
      ...base,
      color: theme.palette.text.primary,
      "& input": {
        font: "inherit",
      },
    }),
  };
  if (type === "select") {
    return (
      <select
        className={"form-control form-control-solid " + customClasses}
        styles={selectStyles}
        name={name}
        id={id}
        value={selected}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  } else {
    return (
      <Select
        className={"react-select " + customClasses}
        classes={classes2}
        styles={selectStyles}
        inputId="react-select-single"
        TextFieldProps={{
          label: { label },
          InputLabelProps: {
            htmlFor: "react-select-single",
            shrink: true,
          },
        }}
        name={name}
        id={id}
        options={options}
        value={selected}
        {...props}
      />
    );
  }
}
