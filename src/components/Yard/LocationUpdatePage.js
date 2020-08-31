import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, Input } from "@utilities";

import SearchIcon from "@material-ui/icons/Search";
import { useFormik } from "formik";
export default function FacilityPage(props) {
  //   const history = useHistory();

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };
  const [loading, setLoading] = useState(false);
  const [showTable, setTable] = useState(false);
  const [erroToaser, setErroToaster] = useState(false);

  const validate = (values) => {
    const errors = {};
    if (!values.number) {
      errors.number = "Required";
    } else if (values.number.length > 5) {
      errors.number = "Must be 5 characters or less";
    }
    return errors;
  };

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      number: "",
    },
    enableReinitialize: true,
    validate,
    onSubmit: (values) => {
      console.log("OnSubmit Data", JSON.stringify(values, null, 2));
      enableLoading();
      setTimeout(() => {
        setTable(true);
        disableLoading();
      }, 1000);
    },
  });
  const [newLocation, setNewLocation] = useState('test');
  const handleLocationChange = (e) => {
    setNewLocation(e.target.value);
  };
  const handleLocationUpdate = () => {
    enableLoading();
    setTimeout(() => {
      setTable(false);
      disableLoading();
      values.number = '';
    }, 1000);
  }
  return (
    <>
    <div className="mt-3 ml-1 d-flex justify-content-start">
        <Link to="/yard/option">
          <Button
            classes="mt-2"
            type="submit"
            variant="primary"
            buttonText="Back"
          />
        </Link>
      </div>
      <div className="row internalRow mt-5 gate-move">
        <div className="col-md-12 internalCol-md-6">
          <Card style={{ cursor: "pointer" }}>
            <Card.Body className="cardMobile">
              <Card.Title className="d-flex align-items-center justify-content-between">
                Location Update
              </Card.Title>
              <form onSubmit={handleSubmit}>
              <div className="d-flex flex-row mb-0 align-items-center mt-3">
                <div className="d-flex align-items-center">
                    <div className="mt-0 loadType">
                      <h6>Container</h6>
                    </div> 
                  <div className="mt-0 input-number pl-2" style={{ width: '100%' }}>
                    <Input
                      type="text"
                      name="number"
                      value={values.number}
                      customClasses="  form-control"
                      onChange={handleChange}
                      style={{ margin: 0 }}
                    />
                    {errors.number ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{errors.number}</div>
                      </div>
                    ) : null}
                  </div>
                  </div>
                  <div className=" mt-0 button-search">
                    <div className="button-search">

                      <Button
                        classes="search-icon"
                        type="submit"
                        buttonText=""
                      >
                        <SearchIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
              <br />
              {showTable && (
                <>
                  {loading && (
                    <span className="ml-3 spinner spinner-black"></span>
                  )}
                  {!loading && (
                    <div className="col-md-6 mt-5 loadType border border-secondary w-100">
                      <br />
                      <div className="d-flex flex-row mb-3">
                        <div className="col mt-5 loadType">

                          <Card.Subtitle className="mb-6 ml-2">
                            <b>Container </b>: {values.number}
                          </Card.Subtitle >
                          <Card.Subtitle className="mb-6 ml-2">
                            <b>Location </b> : 'test'
                              </Card.Subtitle >
                          <Card.Subtitle className="mb-6 ml-2">
                            <b>New Location </b> :
                                <input
                              type="text"
                              value={newLocation}
                              onChange={handleLocationChange}
                              style={{
                                borderLeft: 0,
                                borderRight: 0,
                                borderTop: 0,
                                width: "100px",
                              }}
                            />
                          </Card.Subtitle>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
