const getBaseUrl = () => {
  //return '';
  return process.env.REACT_APP_BASE_URL_API;
};

export const getUrl = (type) => {
  const baseUrl = getBaseUrl();
  switch (type) {
    case "signin":
      return `${baseUrl}/login`;
    case "authVerification":
      return `${baseUrl}/user/auth-verification`;
    case "facilityList":
      return `${baseUrl}/facilitynames`;
    case "facilityCheck":
      return `${baseUrl}/facilityRole`;
    case "damageCodeList":
      return `${baseUrl}/damage/showdamagecodes`;
    case "craneList":
      return `${baseUrl}/cranedetails`;
    case "yardBlockList":
      return `${baseUrl}/yardBlockdetails`;
    case "yardContainerList":
      return `${baseUrl}/yard/showcontainers`;
    case "gatemovecontainer":
      return `${baseUrl}/container/showcontainerlist`;
    case "pickupConfirm":
      return `${baseUrl}/yard/pickup`;
    case "gatemoveapi":
      return `${baseUrl}/gateoperation/getinconfirmation`;
    case "groundingAddapi":
      return `${baseUrl}/yard/grounding`;
    case "locationUpdateGetApi":
      return `${baseUrl}/yard/showlocationupdatecontainers`;
    case "locationUpdatePost":
      return `${baseUrl}/yard/locationUpdate`;
    case "locationSlipPrint":
      return `${baseUrl}/gateoperation/getPrintDetails`;
    case "EIRPrint":
      return `${baseUrl}/gateoperation/printeir`;
    case "updateContainerStatus":
      return `${baseUrl}/gateoperation/printConfirmation`;
    case "updateContainerReprintStatus":
      return `${baseUrl}/gateoperation/printConfirmation`;
    case "userlist":
      return `${baseUrl}/userlist`;
    case "userRolelist":
      return `${baseUrl}/rolelist`;
    case "addUser":
      return `${baseUrl}/addUser`;
    case "editUser":
      return `${baseUrl}/editUser`;
    case "refreshContainer":
      return `${baseUrl}/container/refreshcontainer`;
    case "refreshYardContainer":
      return `${baseUrl}/container/refreshyardcontainer`;
    case "refreshLocationUpdate":
      return `${baseUrl}/container/refreshlocationupdate`;
    case "reprint":
      return `${baseUrl}/gateoperation/reprintlist`;
    default:
      return baseUrl;
  }
};
