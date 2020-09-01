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
    case 'addRole':
      return `${baseUrl}/addRole`;
    default:
      return baseUrl;
  }
};
