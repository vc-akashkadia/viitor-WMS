import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "@utilities";
export default function GroundContainer(props) {
  const data =
    props &&
    props.location &&
    props.location.state &&
    props.location.state.yardOperationValue;
  const [newLocation, setNewLocation] = useState('');
  const handleChange = (e) => {
    setNewLocation(e.target.value);
  };
  return (
    <div className="row internalRow mt-5 gate-move">
      <div className="col-md-12 internalCol-md-6" >
        <Card>
          <Card.Body className="cardMobile">
            <Card.Title>Grounding Container</Card.Title>
            <div className="col-md-6 mt-5 loadType border border-secondary w-100">

            <br /><br />
            <Card.Subtitle className="mb-6 ml-2">
              <b>Container </b>: 
              {/* {data.contain} */}
            </Card.Subtitle>
            <Card.Subtitle className="mb-6 ml-2">
              <b>Status </b> : 
              {/* {data.status} */}
            </Card.Subtitle >
            <Card.Subtitle className="mb-6 ml-2">
              <b>Location </b> : 
              {/* {data.location} */}
            </Card.Subtitle>
            <Card.Subtitle className="mb-6 ml-2">
              <b>New Location </b> :
              <input
                type="text"
                value={newLocation}
                onChange={handleChange}
                style={{
                  borderLeft: 0,
                  borderRight: 0,
                  borderTop: 0,
                  width: "100px",
                }}
              />
            </Card.Subtitle>
            </div>
          </Card.Body>
        </Card>
        <div className="mt-5 mx-2 d-flex justify-content-between">
          <Link to="/yard/operation">
              <Button
                classes="mt-2"
                type="submit"
                variant="primary"
                buttonText="Back"
              />
            </Link> 
            <Link to="/yard/operation">
              <Button
                classes="mt-2"
                type="submit"
                variant="primary"
                buttonText="Confirm"
              />
          </Link>
        </div>
      </div>
    </div>
  );
}
