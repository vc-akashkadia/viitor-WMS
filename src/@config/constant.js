export const constants = {
  apiError: {
    error: "Try After Some Time",
  },
  login: {
    invalid: "Please Enter Valid Username and Password",
    error: {
      username: "User Name is required",
      password: "Password is required",
    },
  },
  facility: {
    error: "Please select Facility",
  },
  operation: {
    title: "Operation",
    craneError: "Please Select Crane",
    location: "location",
    yardOperation: "yardOperation",
    gatein: "gatein",
    gateout: "gateout",
  },
  gateMove: {
    title: "Operation",
  },
  reprint:{
    title:"Reprint"
  },
  yardOperation: {
    title: "Yard Operation",
    pickupsuccess: "Container Pickup Successful",
    groundsuccess: "Container Ground Successful",
    locationSucess: "Location Updated Successful",
    locationError: "Please enter the location",
  },
  gateTypes: [
    { value: "Both", label: "Both" },
    { value: "INBOUND", label: "Inbound" },
    { value: "OUTBOUND", label: "Outbound" },
  ],
  rePrintTypes: [
    { value: "Both", label: "Both" },
    { value: "GATE_IN", label: "Gate In" },
    { value: "GATE_OUT", label: "Gate Out" },
  ],
  vehicle: [
    { value: "Criteria", label: "Criteria" },
    { value: "truck", label: "Truck" },
    { value: "container", label: "Container" },
  ],
  yardType: [
    { value: "ALL", label: "Both" },
    { value: "GROUNDING", label: "Ground" },
    { value: "PICKUP", label: "Pick Up" },
  ],
  vehicleNumber: {
    error: "Please enter Truck or Container No.",
    minError: "Please enter minimum 4 character.",
  },
  formPlaceHolder: {
    block: "Select Block",
    gateType: "Select Type",
    vehical: "Select Criteria",
    userName: "Enter User Name",
    facility: "Select Facility",
  },
  userAccess: {
    error: {
      username: "User Name is required",
      facility: "Please select the facility",
      atleastOne: "Please give atleast one access",
    },
    success: {
      addUser: "User Add Sucessful",
      editUser: "User Edit Sucessful",
    },
  },
  roles: {
    ROLE_YARD: "ROLE_YARD",
    ROLE_GATE: "ROLE_GATE",
    ROLE_LOCATION_UPDATE: "ROLE_LOCATION_UPDATE",
    ROLE_ADMIN: "ROLE_ADMIN",
  },
};
