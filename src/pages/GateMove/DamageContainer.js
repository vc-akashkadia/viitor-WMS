import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';
import { useSelector, useDispatch } from "react-redux";
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
// import CircularProgress from "@material-ui/core/CircularProgress";
import { DamageCodeListApi } from "../../apicalls/GateApiCalls";
import Loader from "../../components/Loader"

export default function DamageContainerPage(props) {
  const [showAdd, setAddButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const [damageList, setDamage] = useState([]);
  const dispatch = useDispatch();
  const authToken = useSelector(({ auth }) => auth.authToken);
  const damageCodes = useSelector(({ base }) => base.damageCodeList);
  useEffect(() => {
    if (damageCodes.length === 0) {
      enableLoading();
      dispatch(DamageCodeListApi(authToken, handleCallbackDamageCodeList));
    }
  }, [damageCodes]);
  const handleCallbackDamageCodeList = (response) => {
    const {
      data: { status },
    } = response;

    disableLoading();
  };
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
      <Grid item xs={12}>
        <Typography variant="h6">Truck Number : 1234</Typography>
        <Typography variant="h6">
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
        </Typography>
        {loading && <Loader />}
        {!loading && (
          <table className="damage-table" responsive="sm" size="sm">
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
                          <Select
                            native
                            value={damage.damageCode}
                            onChange={(event) =>
                              handleOnChange(
                                event.target,
                                "damageCode",
                                damage.id
                              )
                            }
                            inputProps={{
                              name: "damageCode",
                              id: "damageCode",
                            }}
                          >
                            <option aria-label="None" value="" />
                            {damageCodes.map((item) => (
                              <option key={item.value} value={item.value}>
                                {item.label}
                              </option>
                            ))}
                          </Select>
                        </td>
                        <td className="td-textarea">
                          <TextField
                            id="description"
                            label="Description"
                            variant="outlined"
                            size="small"
                            value={damage.description}
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
                                <SaveRoundedIcon
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
          </table>
        )}
      </Grid>
    </>
  );
}
