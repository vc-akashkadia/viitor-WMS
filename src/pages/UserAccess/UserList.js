import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import TitleHeader from "../../components/TitleHeader";
import ScrollToTop from "../../components/ScrollToTop";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EditUserModal from "./EditModal";
import { getUserList } from "../../apicalls/ModuleAccessApiCalls";
import Divider from "@material-ui/core/Divider";
import useGlobalStyle from "@common-style";
import Modal from "components/modal";
import Loader from "components/Loader";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
  },
  // yardTitle: {
  //   margin: "15px 10px 10px 10px",
  //   fontSize: 15,
  //   color: "#5c5c5c",
  // },
  yardCard: {
    padding: 5,
    marginBottom: 5,
    "&:last-child": {
      marginBottom: 0,
    },
  },
  chipMain: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
    "& > *": {
      margin: "2px 1px",
    },
    "@media (min-width:360px)": {
      flexWrap: "nowrap",
      "& > *": {
        margin: "2px 2px",
      },
    },
  },
  chip: {
    height: 26,
    color: "#000000",
    "@media (min-width:360px)": {
      height: 52,
    },
  },
  confirmBtn: {
    backgroundColor: "#40d759",
    minWidth: 37,
    height: 26,
    color: "#fff",
    fontSize: 15,
    fontWeight: 500,
    lineHeight: "20px",
    textTransform: "uppercase",
  },
  // filterSearch: {
  //   margin: "1px 1px",
  //   padding: 10,
  //   position: "fixed",
  //   backgroundColor: "#ffff",
  //   zIndex: "2",
  // },
  // searchTitle: {
  //   fontSize: 15,
  //   color: "#5c5c5c",
  // },
  scroobar:{
    ...theme.layout.scrollbarStyles,
    height: theme.layout.mainDivHeight
  },

  searchInput: {
    width: "100%",
  },
  input: {
    padding: "0px 5px",
  },
  searchBtn: {
    minWidth: "100%",
    textTransform: "capitalize",
    padding: 0,
    height: 26,
  },
}));

const access = {
  ROLE_YARD: "Yard",
  ROLE_GATE: "Gate",
  ROLE_ADMIN: "Admin",
  ROLE_LOCATION_UPDATE: "Location Update",
};

export default function UserList(props) {
  const classes = { ...useGlobalStyle(), ...useStyles() };
  //   const history = useHistory();
  const scrollRef = React.createRef()
  const [open, setOpen] = useState(false);
  const [selectUser, setSelectUser] = useState({});
  const [gModal, setGModal] = useState(false);
  const [openModal, setModal] = useState(false);
  const [data, setData] = useState();
  const [modalData, setModalData] = useState();
  const [type, setType] = useState();
  const [loading, setLoading] = useState(false);
  const authToken = useSelector(({ auth }) => auth.authToken);
  let userList = useSelector(({ base }) => base.userList);
  const dispatch = useDispatch();
  const getUserListApi = () => {
    setLoading(true);
    let data = {};
    dispatch(getUserList(data, authToken, handleCallbackUserList));
  };
  useEffect(getUserListApi, []);

  const handleGModal = (type, user) => {
    setGModal(true);
    setType(type);
    setSelectUser(user);
  };
  const handleOpenModal = (type, item) => {
    setModal(true);
    setModalData(type);
    setData(item);
  };

  const handleCallbackUserList = (response) => {
    setLoading(false);
  };

  const handleCloseModal = (status) => {
    setGModal(false);
    if (status) {
      getUserListApi();
    }
  };
  return (
    <div className={classes.scroobar} ref={scrollRef}>
      <TitleHeader
        open={open}
        isSearch={false}
        setOpen={setOpen}
        title={"User Access"}
        backPath={"/facility"}
      />

      <div
        className={classes.yardMain}
        style={open ? { marginTop: "82px" } : { marginTop: "0px" }}
      >
        <div style={{ position: "relative" }}>
          <Typography className={classes.yardTitle}>User List</Typography>
          <AddCircleIcon
            fontSize="small"
            // style={{position:'absolute',top: '-2px',right:'10px',color:"#5c5c5c"}}
            className={classes.refreshStyle}
            onClick={() => handleGModal("add", {})}
          />
        </div>
        <Divider style={{ marginBottom: "7px" }} />
        {loading && <Loader />}
        {userList &&
          userList.map((user, index) => (
            <Card
              key={index}
              className={classes.yardCard}
              style={{
                border: "1px solid #929eaa",
                margin: "3px",
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box className={classes.chipMain}>
                  <Chip
                    label={user.userName}
                    style={{ width: "101px" }}
                    className={classes.chip}
                  />
                  <Chip
                    label={user.facilityId}
                    style={{ width: "112px" }}
                    className={classes.chip}
                  />
                  <Chip
                    // key={key + "_" + role.roleName}
                    label={
                      user &&
                      user.userRoleId.map(
                        (role, key) => (key ? ", " : "") + access[role.roleName]
                      )
                    }
                    size="medium"
                    style={{ width: "177px" }}
                    onClick={() =>
                      handleOpenModal("user", user && user.userRoleId)
                    }
                    className={classes.chip}
                  />
                  {/* {user.userRoleId.map((role, key) => {
                    if(access[role.roleName] === undefined){
                      return null
                    }
                    return <Chip
                      key={key + "_" + role.roleName}
                      label={access[role.roleName]}
                      size="medium"
                      style={{ width: "90px", color:  "#000000" }}
                    />
                  })} */}
                  <Button
                    className={classes.confirmBtn}
                    onClick={() => handleGModal("edit", user)}
                    style={{ marginLeft: "auto" }}
                  >
                    <EditIcon fontSize="small" />
                  </Button>
                </Box>
              </Box>
            </Card>
          ))}
      </div>
      <ScrollToTop   refClass={scrollRef}/>
      {gModal && (
        <EditUserModal
          open={gModal}
          setOpen={handleCloseModal}
          type={type}
          api={"Location Api"}
          data={"LOC1234"}
          user={selectUser}
        />
      )}
      {openModal && (
        <Modal
          open={openModal}
          setOpen={setModal}
          // modalData={"container"}
          modalData={modalData}
          data={data}
        />
      )}
    </div>
  );
}
