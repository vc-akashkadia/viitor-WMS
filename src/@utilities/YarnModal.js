import React from "react";
import { Modal } from "react-bootstrap";
import Button from "./ButtonUtils";

export default function Example(props) {
  const { message, finalData, handleClick, handleShow, show, setShow } = props;
  const handleClose = () => props.setShow(false);
  const handleClickData = () => {
    setShow(false);
    handleClick();
    console.log("finaleData", finalData);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onclick={handleClickData}
            buttonText="Yes"
          />
          <Button variant="secondary" onclick={handleClose} buttonText="No" />
        </Modal.Footer>
      </Modal>
    </>
  );
}
