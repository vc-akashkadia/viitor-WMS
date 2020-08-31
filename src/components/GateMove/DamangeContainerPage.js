import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DropDown, Button, Toaster, Input } from "@utilities";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Table from "react-bootstrap/Table";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
// import { valueFocusAriaMessage } from 'react-select/src/accessibility';
const damageCodes = [
  { value: "", label: "Select" },
  { value: "D1", label: "D1" },
  { value: "D2", label: "D2" },
  { value: "D3", label: "D3" },
  { value: "D4", label: "D4" },
  { value: "D5", label: "D5" },
];
// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues

export default function DamageContainerPage(props) {
  const [tosterShow, setToaster] = useState(false);
  const [showAdd, setAddButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [damageList, setDamage] = useState([
    { id: 0, damageCode: "D1", description: "Testing Damage", editable: false },
    {
      id: 1,
      damageCode: "D3",
      description: "Testing Damage D3",
      editable: false,
    },
  ]);

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  const addDamageRow = () => {
    // alert('here')
    let newDamageList = [
      ...damageList,
      {
        id: Math.random(),
        damageCode: "",
        description: "",
        editable: true,
      },
    ];
    setDamage(newDamageList);
    setAddButton(!showAdd);
  };

  const handleOnChange = (event, valueFor, damageId) => {
    let newDamageList = [...damageList];
    newDamageList.map((item) => {
      if (item.id === damageId) {
        if (valueFor === "description") item.description = event.value;
        if (valueFor === "damageCode") item.damageCode = event.value;
      }
      return item;
    });
    setDamage(newDamageList);
  };

  const handleSave = (damageId) => {
    //let damage = damageList.find((item) => item.id === damageId);
    let newDamageList = [...damageList];
    newDamageList.map((item) => {
      item.editable = false;
      return item;
    });
    enableLoading();
    setTimeout(() => {
      setDamage(newDamageList);
      setAddButton(!showAdd);
      disableLoading();
    }, 1000);
  };

  const handleRemove = (damageId) => {
    let newDamageList = [...damageList];
    setDamage(newDamageList.filter((item) => item.id !== damageId));
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  return (
    <>
      <div className="row internalRow mt-5 gate-move damage-container">
        <div className="col-12 internalCol-md-6">
          <Link to={props.location.state.prevPath}>
            <Button
              // classes="mt-0"
              type="submit"
              variant="primary"
              buttonText="Back"
            />
          </Link>
        </div>
      </div>
      <div className="row internalRow mt-5 gate-move damage-container">
        <div className="col-12 internalCol-md-6">
          <Card>
            <Card.Body className="cardMobile">
              <Card.Title>Truck Number : {props.number} </Card.Title>
              <Card.Title className="d-flex justify-content-between align-items-center">
                <span>Container : {props.match.params.container_id} </span>
                {showAdd && (
                  <span>
                    <AddCircleRoundedIcon
                      onClick={addDamageRow}
                      className="add-icon"
                      color="secondary"
                    />
                  </span>
                )}
              </Card.Title>
              {loading && <span className="ml-3 spinner spinner-black"></span>}
              {!loading && (
                <Table
                  className="damage-table"
                  striped
                  bordered
                  responsive="sm"
                  size="sm"
                >
                  <thead>
                    <tr>
                      <th>D. Code</th>
                      <th>Description</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {damageList.map((damage) => {
                      return (
                        <tr key={damage.id}>
                          {!damage.editable ? (
                            <>
                              <td>{damage.damageCode}</td>
                              <td>{damage.description}</td>
                              <td>
                                <CancelRoundedIcon
                                  className="svg-width-100"
                                  color="error"
                                  onClick={(e) => handleRemove(damage.id)}
                                />
                              </td>
                            </>
                          ) : (
                              <>
                                <td>
                                  <DropDown
                                    type="select"
                                    customClasses=""
                                    options={damageCodes}
                                    selected={damage.damageCode}
                                    onChange={(event) =>
                                      handleOnChange(
                                        event.target,
                                        "damageCode",
                                        damage.id
                                      )
                                    }
                                    label="Select LoadType"
                                  />
                                </td>
                                <td className="td-textarea">
                                  <Input
                                    type="text"
                                    name="description"
                                    value={damage.discription}
                                    style={{ margin: 0 }}
                                    multiline
                                    rows="2"
                                    customClasses=" damage-textarea form-control"
                                    onChange={(e) => {
                                      handleOnChange(
                                        e.target,
                                        "description",
                                        damage.id
                                      );
                                    }}
                                  />
                                </td>
                                <td>
                                  <SaveOutlinedIcon
                                    color="secondary"
                                    onClick={(e) => handleSave(damage.id)}
                                  />
                                </td>
                              </>
                            )}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="row internalRow">
        <div className="mt-5 col-12 d-flex justify-content-end">
          <Link to={props.location.state.prevPath}>
            <Button
              classes="mt-0"
              type="submit"
              variant="primary"
              buttonText="Ok"
            />
          </Link>
        </div>
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
