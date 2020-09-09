const getBaseUrl = () => {
  //return '';
  return process.env.REACT_APP_BASE_URL_API
};


export const getUrl = (type) => {
  const baseUrl = getBaseUrl();
  switch (type) {
    case 'signin':
      return `${baseUrl}/login`;
    case 'authVerification':
      return `${baseUrl}/user/auth-verification`;
    case 'facilityList':
      return `${baseUrl}/facilitynames`;
    case 'damageCodeList':
      return `${baseUrl}/damage/showdamagecodes`;
    case 'craneList':
      return `${baseUrl}/cranedetails?facilityId=`;
    case 'yardBlockList':
      return `${baseUrl}/yardBlockdetails?facilityId=`;
    case 'yardContainerList':
      return `${baseUrl}/yard/showcontainers`;
    case 'gatemovecontainer':
      return `${baseUrl}/container/showcontainerlist`;
    case 'pickupConfirm':
      return `${baseUrl}/yard/pickup`;
    case 'gatemoveapi':
      return `${baseUrl}/gateoperation/getinconfirmation`;
    case 'addRole':
      return `${baseUrl}/addRole`;
    case 'groundingAddapi':
      return `${baseUrl}/yard/grounding`;
    case 'locationSlipPrint':
      return `${baseUrl}/gateoperation/getPrintDetails`;
    case 'EIRPrint':
      return `${baseUrl}/gateoperation/printeir`;
    default:
      return baseUrl;
  }
};
