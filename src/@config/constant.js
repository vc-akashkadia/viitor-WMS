export const constants = {
  apiError: {
    error: "Try After Some Time",
  },
  login: {
    invalid: "Invalid Login",
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
  yardOperation: {
    title: "Yard Operation",
    pickupsuccess: "Container Pickup Successfully",
    groundsuccess: "Container Ground Successfully",
    locationSucess:"Location Updated Successfull",
    locationError:"Please enter the location",

  },
  gateTypes: [
    { value: "Both", label: "Both" },
    { value: "INBOUND", label: "Inbound" },
    { value: "OUTBOUND", label: "Outbound" },
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
    minError: "Please enter Truck or Container No.",
  },
  formPlaceHolder: {
    block: "Select Block",
    gateType: "Select Type",
    vehical: "Select Criteria",
    userName:"Enter User Name",
    facility:"Select Facility",
  },
  userAccess: {
    error: {
      username: "User Name is required",
      facility: "Please select the facility",
      atleastOne:"Please give atleast one access"
    },
    success:{
        addUser : "User Add Sucessful",
        editUser : "User Edit Sucessful"
    }
  },
};
