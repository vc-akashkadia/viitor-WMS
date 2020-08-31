import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DropDown, Button, Toaster, Input, Table } from "@utilities";
import { useFormik } from "formik";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import RemoveIcon from "@material-ui/icons/Remove";
// import PageviewIcon from "@material-ui/icons/Pageview";
import PrintIcon from "@material-ui/icons/Print";
// import IconButton from '@material-ui/core/IconButton';
import SearchIcon from "@material-ui/icons/Search";

// import { valueFocusAriaMessage } from 'react-select/src/accessibility'
const loadTypes = [
  { value: "", label: "Criteria" },
  { value: "Truck", label: "Truck" },
  { value: "Container", label: "Container" },
];

const gateType = [
  { value: "", label: "Type" },
  { value: "Inbound", label: "Inbound" },
  { value: "Outbound", label: "Outbound" },
];
// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues

export default function GateMovePage(props) {
  const [tosterShow, setToaster] = useState(false);
  // const [loadType, setVehical] = useState(props.vehical);
  // const [number, setNumber] = useState(props.number);
  const [loading, setLoading] = useState(false);
  const [showTable, setTable] = useState(true);

  // const handleSubmitForm = (e) => {
  //   e.preventDefault();
  //   if (Object.keys(loadType).length > 0 && number !== "") {
  //     let data = {
  //       vehical: loadType,
  //       number: number,
  //     };
  //     enableLoading();
  //     props.setGateINOptions(data);
  //     setTable(true);
  //     setTimeout(() => {
  //       disableLoading();
  //     }, 1000);
  //   } else {
  //     setToaster(true);
  //   }
  // };

  // function handleChange(value) {
  //   setVehical(value);
  // }

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };
  const data = [
    {
      id: 1,
      truck_no: "C1",
      type: "T1",
      departure: "MT",
    },
    {
      id: 2,
      truck_no: "C2",
      type: "T2",
      departure: "Exp",
    },
  ];

  const columns = [
    {
      dataField: "truck_no",
      text: "Truck No",
      sort: true,
    },
    {
      dataField: "type",
      text: "Type",
      sort: true,
    },
  ];
  const expandRow = {
    onlyOneExpanding: true,
    renderer: (row) => (
      <>
        <span>
          <h5>
            <b>Departure :</b> {row.departure}
          </h5>{" "}
        </span>

        <span>
          <h5>
            <b>Action :</b>{" "}
            <Link
              to={{
                pathname: `/container-damage/${row.id}`,
                state: { prevPath: window.location.pathname },
              }}
            >
              <EditIcon />
            </Link>
          </h5>{" "}
        </span>
      </>
    ),
    showExpandColumn: true,
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {
      if (isAnyExpands) {
        return <RemoveIcon />;
      }
      return <AddIcon />;
    },
    expandColumnRenderer: ({ expanded }) => {
      if (expanded) {
        return <RemoveIcon />;
      }
      return <AddIcon />;
    },
  };
  const validate = (values) => {
    const errors = {};
    if (!values.loadType) {
      errors.loadType = "Requires";
    }
    if (!values.type) {
      errors.type = "Requires";
    }

    if (!values.number) {
      errors.number = "Required";
    } else if (values.number.length > 5) {
      errors.number = "Must be 5 characters or less";
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
      number: props.number,
      loadType: props.vehical,
      type: props.type,
    },
    enableReinitialize: true,
    validate,
    onSubmit: (values) => {
      let data = {
        vehical: values.loadType,
        number: values.number,
        type: values.type,
      };
      enableLoading();
      props.setGateINOptions(data);
      setTable(true);
      setTimeout(() => {
        disableLoading();
      }, 1000);
    },
  });
  const handleChangeData = (value, formFeild) => {
    setFieldValue(formFeild, value);
  };
  return (
    <>
      <div className="mt-5 ml-1 d-flex justify-content-start">
        <Link to="/operations">
          <Button
            // classes="mt-0 back-btn"
            type="submit"
            variant="primary"
            buttonText="Back"
          />
        </Link>
      </div>
      <br />
      <div className="row internalRow  gate-move">
        <div className="col-md-12 internalCol-md-6">
          <Card>
            <Card.Body className="cardMobile">
              <form onSubmit={handleSubmit}>
                <Card.Title className="d-flex align-items-center justify-content-between">
                  Gate {props.gateType}
                  <div className="ml-2">
                    <DropDown
                      type="select"
                      options={gateType}
                      selected={values.type}
                      onChange={(event) =>
                        handleChangeData(event.target.value, "type")
                      }
                      label="Select Type"
                    />
                    {errors.type ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{errors.type}</div>
                      </div>
                    ) : null}
                  </div>
                </Card.Title>

                <div className="d-flex flex-row mb-0 align-items-center mt-3">
                  <div className="d-flex align-items-center">
                    <div className="mt-0 loadType" style={{ width: "100%" }}>
                      <DropDown
                        type="select"
                        options={loadTypes}
                        selected={values.loadType}
                        onChange={(event) =>
                          handleChangeData(event.target.value, "loadType")
                        }
                        label="Select LoadType"
                      />
                      {errors.loadType ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{errors.loadType}</div>
                        </div>
                      ) : null}
                    </div>
                    <div
                      className="mt-0 input-number pl-2"
                      style={{ width: "100%" }}
                    >
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
                  <div className="mt-0 button-search">
                    <Button
                      classes="search-icon"
                      type="submit"
                      // variant="secondary"
                      buttonText=""
                    >
                      <SearchIcon />
                    </Button>
                  </div>
                </div>
              </form>
            </Card.Body>
          </Card>
        </div>
        {showTable && (
          <div className="col-md-12 internalCol-md-6">
            <Card>
              <Card.Body className="cardMobile">
                {loading && (
                  <span className="ml-3 spinner spinner-black"></span>
                )}
                {!loading && (
                  <Table
                    keyField="id"
                    wrapperClasses="table-responsive"
                    tableType="bootstrap"
                    data={data}
                    columnsData={columns}
                    expandRow={expandRow}
                  />
                )}
              </Card.Body>
              <Link className="d-flex justify-content-end" to="/operations">
                <Button
                  classes="my-2 mr-2"
                  type="submit"
                  variant="primary"
                  buttonText={`Gate ${props.gateType}`}
                />
              </Link>
            </Card>
          </div>
        )}
      </div>
      <div className="mt-5 mx-3 d-flex justify-content-end">
        <Button
          classes=""
          type="button"
          variant="primary"
          buttonText="Print Slip"
        >
          <PrintIcon className="svg-width-100" />
        </Button>
      </div>
      <Toaster
        visibility={tosterShow}
        duration={6000}
        handleClose={() => setToaster(false)}
        variant="error"
        message="All Field Required"
      />
    </>
  );
}
