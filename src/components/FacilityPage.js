import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { DropDown, Toaster, Button } from "@utilities";
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom";
const suggestions = [
  { value: "Afghanistan", label: "Afghanistan" },
  { value: "Aland Islands", label: "Aland Islands" },
  { value: "Albania", label: "Albania" },
  { value: "Algeria", label: "Algeria" },
  { value: "American Samoa", label: "American Samoa" },
  { value: "Andorra", label: "Andorra" }
];

export default function FacilityPage(props) {
  const history = useHistory();
  const [facility, setFacility] = useState(props.facility);
  const [tosterShow, setToaster] = useState(false);
  function handleChangeFacility(value) {
    setFacility(value);
  }

  function handleStoreFacility() {
    if (Object.keys(facility).length !== 0) {
      props.selectFacility(facility);
      history.push("/operations");
    } else {
      setToaster(true);
    }
  }

  return (
    <>
      <div className="row internalRow mt-5">
        <div className="col-md-12 internalCol-md-6">
          <Card>
            <Card.Body className="cardMobile">
              <Card.Title>Facility</Card.Title>
              <DropDown
                options={suggestions}
                selected={facility}
                onChange={handleChangeFacility}
                label="Select facility"
              />
              <div className="mt-5 d-flex justify-content-center">
                <Button
                  // classes="mt-2"
                  type="submit"
                  onclick={handleStoreFacility}
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
        message="Please Select Facility"
      />
    </>
  );
}
