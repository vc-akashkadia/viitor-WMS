import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { DropDown, Button, Toaster, CheckBox } from "@utilities";

const facility = [
  { value: "Afghanistan", label: "Afghanistan" },
  { value: "Aland Islands", label: "Aland Islands" },
  { value: "Albania", label: "Albania" },
  { value: "Algeria", label: "Algeria" },
  { value: "American Samoa", label: "American Samoa" },
  { value: "Andorra", label: "Andorra" },
];

export default function Example(props) {
  const { userDetails, show, setShow } = props;
  const [tosterShow, setToaster] = useState(false);
  const handleClose = () => props.setShow(false);
  const validate = (values) => {
    const errors = {};
    if (!values.facility) {
      errors.facility = "Requires";
    }
    if (!values.gateIn && !values.yardOperation) {
      errors.anyone = "Please give atleast one access";
    }
    return errors;
  };

  const { handleSubmit, values, errors, setFieldValue } = useFormik({
    initialValues: {
      facility: { value: userDetails.facility, label: userDetails.facility },
      gateIn: userDetails.gateIn,
      yardOperation: userDetails.yardOperation,
    },
    enableReinitialize: true,
    validate,
    onSubmit: (values) => {
      props.updatedUserDetail(values);
      setShow(false);
      setToaster(true);
    },
  });

  const handleCheckbox = (e, targetName) => {
    setFieldValue(targetName, e.target.checked);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="editUser-modal">
        <Modal.Header className="h2">Edit User Access</Modal.Header>
        <Modal.Body className="module-access">
          <form onSubmit={handleSubmit}>
            <div className="d-flex flex-row mb-3 mt-1">
              <div className="pr-0 pl-0 col-4 pt-3">
                <label>User Name</label>
              </div>
              <div className=" pr-0 pl-0 mt-3 ml-2 col-md-auto">
                <span className="h5">{userDetails.username}</span>
              </div>
            </div>
            <div className="d-flex flex-row mb-3 mt-1">
              <div className="pr-0 pl-0 col-4 pt-3">
                <label>Facility</label>
              </div>
              <div className=" pr-0 pl-0 col-md-auto">
                <DropDown
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
              <div className=" ml-4 mt-5">
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
            <div className="d-flex justify-content-between">
              <Button
                classes=""
                type="submit"
                variant="primary"
                buttonText="Update"
              />
              <Button
                classes=""
                onclick={() => setShow(false)}
                variant="primary"
                buttonText="Close"
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <Toaster
        visibility={tosterShow}
        duration={6000}
        handleClose={() => setToaster(false)}
        variant="success"
        message="User Updated Successfully"
      />
    </>
  );
}
