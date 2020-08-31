import React, { useState } from "react";
import { Card } from "react-bootstrap";
import {
  DropDown,
  Button,
  Input,
  Modal,
  Toaster,
  // Table,
} from "@utilities";
import { useFormik } from "formik";
import { Link, useHistory } from "react-router-dom";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import SearchIcon from "@material-ui/icons/Search";
// import Icon from "@material-ui/core/Icon";
const data = [
  {
    id: "1",
    container: "c1",
    truckno: "2451",
    status: "Ground",
    location: "LOC111",
  },
  {
    id: "2",
    container: "c2",
    truckno: "3625",
    status: "Pickup",
    location: "LOC12",
  },
];

const block = [
  { value: "", label: "Block" },
  { value: "01", label: "01" },
  { value: "02", label: "02" },
];
const upDown = [
  { value: "", label: "Type" },
  { value: "In Bound", label: "In Bound" },
  { value: "Out Bound", label: "Out Bound" },
];
const vehicle = [
  { value: "", label: "Creiteria" },
  { value: "truck", label: "Truck" },
  { value: "container", label: "Container" },
];

export default function YardOperation(props) {
  const yardCrane =
    props &&
    props.location &&
    props.location.state &&
    props.location.state.yardCrane;
  const history = useHistory();
  const [tosterShow, setToaster] = useState(false);

  const columns = [
    {
      dataField: "container",
      text: "Container",
      sort: true,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
    },
    // {
    //   dataField: "location",
    //   text: "Location",
    //   sort: true,
    //   headerStyle: { backgroundColor: '#6993FF', color: 'white'}
    // },
  ];

  const [loading, setLoading] = useState(false);
  const [showTable, setTable] = useState(true);
  const [erroToaser, setErroToaster] = useState(false);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const validate = (values) => {
    const errors = {};
    // if (!values.loadType) {
    //   errors.loadType = "Requires";
    // }
    // if (!values.upDown) {
    //   errors.upDown = "Requires";
    // }
    // if (!values.whicle) {
    //   errors.whicle = "Requires";
    // }

    // if (!values.number) {
    //   errors.number = "Required";
    // } else if (values.number.length > 5) {
    //   errors.number = "Must be 5 characters or less";
    // }
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
      number: "",
      block: "",
      upDown: "",
      vehicle: "",
    },
    enableReinitialize: true,
    validate,
    onSubmit: (values) => {
      console.log("OnSubmit Data", JSON.stringify(values, null, 2));
      enableLoading();
      setTable(true);
      setTimeout(() => {
        disableLoading();
      }, 1000);
    },
  });

  const [finalData, setFinalData] = useState(false);

  const handleChangeData = (value, setFieldValue) => {
    setFieldValue("block", value);
  };

  // const handleRadioChange = (e) => {
  //   const fData = data.filter((i) => i.id === e.id);
  //   setFinalData(fData && fData[0]);
  // };
  const [show, setShow] = useState(false);

  const handleClick = () => {
    if (finalData) {
      if (finalData && finalData.status === "Pickup") {
        setErroToaster(false);
        setToaster(true);
      }
    }
    console.log("finaleData", finalData);
  };
  const handleShowModal = (item) => {
    if (item && item.status === "Ground") {
      setShow(false);
      history.push({
        pathname: "/yard/ground/container",
        state: { yardOperationValue: item },
      });
    } else {
      setShow(true);
    }
    setFinalData(item);
  };

  const expandRow = {
    onlyOneExpanding: true,
    renderer: (row) => (
      <span>
        <h6>
          <b>Location :</b> {row.location}
        </h6>{" "}
      </span>
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

  const onRowSelect = (row, isSelected) => {
    const fData = data.filter((i) => i.id === row.id);
    setFinalData(fData && fData[0]);
  };

  const selectRow = {
    mode: "radio",
    clickToSelect: true,
    onSelect: onRowSelect,
  };

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
      <div className="row internalRow mt-2 gate-move">
        <div className="col-md-12 internalCol-md-6">
          <Card>
            <Card.Body className="cardMobile">
              <Card.Title className="d-flex align-items-center justify-content-between">
                Yard Operation {`Crane(${yardCrane && yardCrane.value})`}
              </Card.Title>
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-row mb-3">
                  <div className="col mt-5 loadType">
                    <DropDown
                      type="select"
                      name="loadType"
                      customClasses=""
                      options={block}
                      selected={values.block}
                      onChange={(event) =>
                        handleChangeData(event.target.value, setFieldValue)
                      }
                      label="Select LoadType"
                    />
                    {errors.loadType ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{errors.loadType}</div>
                      </div>
                    ) : null}
                  </div>
                  &nbsp;&nbsp;
                  <div className="col mt-5 loadType">
                    <DropDown
                      type="select"
                      name="upDown"
                      customClasses=""
                      options={upDown}
                      selected={values.upDown}
                      onChange={(event) =>
                        setFieldValue("upDown", event.target.value)
                      }
                      label="Select UpDown"
                    />
                    {errors.upDown ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{errors.upDown}</div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="d-flex flex-row mb-0 align-items-center mt-3">
                  <div className="d-flex align-items-center">
                    <div className="mt-0 loadType" style={{ width: "100%" }}>
                      <DropDown
                        type="select"
                        name="vehicle"
                        customClasses=""
                        options={vehicle}
                        selected={values.vehicle}
                        onChange={(event) =>
                          setFieldValue("vehicle", event.target.value)
                        }
                        label="Select vehicle"
                      />
                      {errors.vehicle ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{errors.vehicle}</div>
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
              {showTable && (
                <>
                  {loading && (
                    <span className="ml-3 spinner spinner-black"></span>
                  )}
                  {!loading && (
                    <>
                      <div className="ml-0 mb-3">
                        {/* <Table
                            keyField="id"
                            data={data}
                            wrapperClasses="table-responsive"
                            columnsData={columns}
                            actionType="radio"
                            selectRow={selectRow}
                            expandRow={expandRow}
                            tableType="bootstrap"
                          /> */}
                        {data &&
                          data.length > 0 &&
                          data.map((item, key) => {
                            return (
                              <div className="col-md-6 mt-5 loadType border border-secondary w-100">
                                <br />
                                <Card.Subtitle className="mb-6 ml-2">
                                  <b>Container </b>: {item.container}
                                </Card.Subtitle>
                                <Card.Subtitle className="mb-6 ml-2">
                                  <b>Truck No. </b>: {item.truckno}
                                </Card.Subtitle>
                                <Card.Subtitle className="mb-6 ml-2">
                                  <b>Status </b>: {item.status}
                                </Card.Subtitle>
                                <Card.Subtitle className="mb-6 ml-2">
                                  <b>Location </b>: {item.location}
                                </Card.Subtitle>
                                <div className="mb-3 ml-2 d-flex justify-content-start">
                                  <Button
                                    type="submit"
                                    variant="primary"
                                    buttonText="Confirm"
                                    size="sm"
                                    onclick={() => handleShowModal(item)}
                                  />
                                </div>
                                {/* <Card.Subtitle className="mb-3 ml-2">
                                    <Icon onClick={() => handleShowModal(item)} className={" fa fa-check-square"} />
                                  </Card.Subtitle> */}
                              </div>
                            );
                          })}
                      </div>
                    </>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
      <Modal
        message={"Are you sure to confirm"}
        finalData={finalData}
        passingRoute={"/yard/ground/container"}
        handleClick={handleClick}
        handleShow={handleShowModal}
        show={show}
        setShow={setShow}
      />
      <Toaster
        visibility={tosterShow}
        duration={6000}
        handleClose={() => setToaster(false)}
        variant={erroToaser ? "error" : "success"}
        message={
          erroToaser ? "Please Select the value" : "C2 confirm successfully"
        }
      />
    </>
  );
}
