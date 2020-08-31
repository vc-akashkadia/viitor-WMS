import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button, Toaster,Table } from "@utilities";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import EditIcon from "@material-ui/icons/Edit";
// import BootstrapTable from "react-bootstrap-table-next";
import EditUser from "./EditUser";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

export default function ModuleAccessList(props) {
  const [tosterShow, setToaster] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [userDetails, setEditUserDetails] = useState({});
  const [userList, setUserList] = useState([
    {
      id: 1,
      username: "Nick",
      facility: "Afghanistan",
      access: "Gate In",
      gateIn: true,
      yardOperation: false,
    },
    {
      id: 2,
      username: "John ",
      facility: "Algeria",
      access: "Yard Job",
      gateIn: true,
      yardOperation: true,
    },
  ]);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };
  const rankFormatter = (cell, row, rowIndex, formatExtraData) => {
    return <EditIcon onClick={() => handleEdit(row)} />;
  };

  const columns = [
    {
      dataField: "username",
      text: "User Name",
      sort: true,
    },
    {
      dataField: "facility",
      text: "Facility",
      sort: true,
    },
  ];

  const handleEdit = (userDetail) => {
    setEditUserDetails(userDetail);
    setEditModal(true);
  };
  const updateUser = (editedUser) => {
    console.log(editedUser);
  };
  const expandRow = {
    onlyOneExpanding: true,
    renderer: (row) => (
      <>
        <span>
          <h5>Access : {row.access}</h5>{" "}
        </span>

        <span>
          <h5>
            Action : <EditIcon onClick={() => handleEdit(row)} />
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
  return (
    <>
      <div className="row internalRow mt-5 gate-move damage-container">
        <div className="col-md-6 internalCol-md-6">
          <Card>
            <Card.Body className="cardMobile">
              <Card.Title className="d-flex justify-content-between">
                <h4>User Access</h4>
                <Link to="/module-access/add-user">
                  <AddCircleRoundedIcon
                    className="add-icon"
                    color="secondary"
                  />
                </Link>
              </Card.Title>
              {loading && <span className="ml-3 spinner spinner-black"></span>}
              {!loading && (
                <Table
                  keyField="id"
                  data={userList}
                  wrapperClasses="table-responsive"
                  columns={columns}
                  expandRow={expandRow}
                  tableType="bootstrap"
                />
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="mt-5 mx-3 d-flex justify-content-between">
        <Link to="/admin">
          <Button
            classes=""
            type="submit"
            variant="primary"
            buttonText="Back"
          />
        </Link>
      </div>
      <Toaster
        visibility={tosterShow}
        duration={6000}
        handleClose={() => setToaster(false)}
        variant="error"
        message="All Field Required"
      />
      <EditUser
        show={editModal}
        updatedUserDetail={updateUser}
        userDetails={userDetails}
        setShow={setEditModal}
      />
    </>
  );
}
