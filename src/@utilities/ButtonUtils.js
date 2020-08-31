import React from "react";
import { Button } from "react-bootstrap";
export default function ButtonUtils({
  type,
  classes,
  variant,
  onclick,
  buttonText,
  children,
  size
}) {
  return (
    <>
      <Button
        className={classes}
        type={type}
        onClick={onclick}
        variant={variant}
        size={size}
      >
        {children}
        {buttonText}
      </Button>
    </>
  );
}
