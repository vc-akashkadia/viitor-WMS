import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { DropDown, Toaster, Button } from "@utilities";
import { useHistory, Link } from "react-router-dom";

const suggestions = [
  { value: "C123", label: "C123" },
  { value: "C456", label: "C456" },
  { value: "C415", label: "C415" },
];

export default function YardCrane(props) {
  const [yardCrane, setYardCrane] = useState(props.yardCrane);
  const history = useHistory();
  const [tosterShow, setToaster] = useState(false);
  function handleChangeYardCrane(value) {
    setYardCrane(value);
  }

  function handleStoreYarnCrane() {
    if (Object.keys(yardCrane).length !== 0) {
      props.selectYardCrane(yardCrane);
      history.push({
        pathname: "/yard/option",
        state: { yardCrane: yardCrane },
      });
    } else {
      setToaster(true);
    }
  }
  return (
    <>
       <div className="row internalRow mt-5 gate-move damage-container">
        <div className="col-12 internalCol-md-6">
          <Link to="/operations">
            <Button
              classes="mt-2"
              type="submit"
              variant="primary"
              buttonText="Back"
            />
          </Link>
        </div>
      </div>
      <div className="row internalRow mt-2">
        <div className="col-md-12 internalCol-md-6">
          <Card>
            <Card.Body className="cardMobile">
              <Card.Title>Yard Crane</Card.Title>
              <DropDown
                options={suggestions}
                selected={yardCrane}
                onChange={handleChangeYardCrane}
                label="Select facility"
              />
              <div className="mt-5 d-flex justify-content-center">
                <Button
                  classes="mt-2"
                  type="submit"
                  onclick={handleStoreYarnCrane}
                  variant="primary"
                  buttonText="Ok"
                />
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
      <Toaster
        visibility={tosterShow}
        duration={6000}
        handleClose={() => setToaster(false)}
        variant="error"
        message="Please Select Yard crane"
      />
    </>
  );
}
