import React, { useState, useRef } from "react";
import { Card } from "react-bootstrap";
import { useFormik } from "formik";
import { useHistory, Link } from "react-router-dom";
import { DropDown, Button, Toaster, Input, CheckBox } from "@utilities";
import { getUrl } from "../../services/network/urls";
import { post } from "../../services/network/requests";
// import { valueFocusAriaMessage } from 'react-select/src/accessibility';
const facility = [
  { value: "Chennai", label: "Chennai" },
  { value: "Mumbai", label: "Mumbai" },
];
// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
let toaster = {
  varient: "success",
  message: "User Added Successfully",
};
export default function ModuleAccessList(props) {
  const history = useHistory();
  const [tosterShow, setToaster] = useState(false);
  const [loading, setLoading] = useState(false);

  const button = useRef(null);

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Requires";
    }
    if (!values.facility) {
      errors.facility = "Requires";
    }
    if (!values.gateIn && !values.yardOperation) {
      errors.anyone = "Please give atleast one access";
    }
    return errors;
  };

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      username: "",
      facility: {},
      gateIn: false,
      yardOperation: false,
    },
    enableReinitialize: true,
    validate,
    onSubmit: (values) => {
      setLoading(!loading);
      let data =  {
          "username":values.username,
          "facilityName":values.facility.value,
          "roleList":[] 
      }
      if(values.gateIn){
        data.roleList.push({"roleName":"GATE_JOB"})
      }
      if(values.yardOperation){
        data.roleList.push({"roleName":"YARD_JOB"})
      }
      let url = getUrl("addRole");
        post(url,data,true).then(response => {
          setLoading(!loading);
          
        })
        .catch((err) => {
          setLoading(!loading);
        });
      
      //setToaster(!tosterShow);
      
      setTimeout(() => {
        //history.push("/module-access");
      }, 1000);
    },
  });

  const handleCheckbox = (e, targetName) => {
    setFieldValue(targetName, e.target.checked);
  };

  const handleAdd = () => {
    button.current.click();
  };

  return (
    <>
      <div className="row internalRow mt-5 module-access">
        <div className="col-md-6 internalCol-md-6">
          <Card>
            <Card.Body className="cardMobile">
              <Card.Title className="d-flex justify-content-right">
                Add User Access
              </Card.Title>

              {loading && <span className="ml-3 spinner spinner-black"></span>}
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row mb-3 mt-3">
                  <div className="pr-0 pl-0 col-4 pt-3">
                    <label>User Name</label>
                  </div>
                  <div className=" pr-0 pl-0 col-md-auto">
                    <Input
                      type="text"
                      name="username"
                      value={values.username}
                      customClasses="m-0 form-control"
                      onChange={handleChange}
                    />
                    {errors.username ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{errors.username}</div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="d-flex flex-row mb-3 mt-3">
                  <div className="pr-0 pl-0 col-4 pt-3">
                    <label>Facility</label>
                  </div>
                  <div className=" pr-0 pl-0 col-md-auto">
                    <DropDown
                      name="facility"
                      customClasses=""
                      options={facility}
                      selected={values.facility}
                      onChange={(value) => setFieldValue("facility", value)}
                      label="Select LoadType"
                    />
                    {errors.facility ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{errors.facility}</div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="access-box mb-3 border-dark border mt-3 h-10">
                  <span className="access-label">Access</span>
                  <div className=" ml-4 mt-5">
                    <CheckBox
                      isSelected={values.gateIn}
                      onChange={(e) => handleCheckbox(e, "gateIn")}
                    >
                      <p>Gate In</p>
                    </CheckBox>
                  </div>
                  <div className="  ml-4 mt-5">
                    <CheckBox
                      isSelected={values.yardOperation}
                      onChange={(e) => handleCheckbox(e, "yardOperation")}
                    >
                      <p>Yard Operation</p>
                    </CheckBox>
                  </div>
                  {errors.anyone ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">{errors.anyone}</div>
                    </div>
                  ) : null}
                </div>
                <button
                  style={{ display: "none" }}
                  ref={button}
                  type="submit"
                ></button>
              </form>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="mt-5 mx-3 d-flex justify-content-between">
      <Link to="/module-access">
          <Button
            classes=""
            type="button"
            variant="primary"
            buttonText="Back"
          />
        </Link>
        <Button
          classes=""
          type="submit"
          variant="primary"
          buttonText="Add User"
          onclick={handleAdd}
        />
      
      </div>
      <Toaster
        visibility={tosterShow}
        duration={6000}
        handleClose={() => setToaster(false)}
        variant={toaster.varient}
        message={toaster.message}
      />
    </>
  );
}
