const getBaseUrl = () => {
  //return '';
  return process.env.REACT_APP_BASE_URL_API
};


export const getUrl = (type) => {
  const baseUrl = getBaseUrl();
  switch (type) {
    case 'signup':
      return `${baseUrl}/user/signup`;
    case 'signin':
      return `${baseUrl}/login`;
    case 'authVerification':
      return `${baseUrl}/user/auth-verification`;
    case 'addRole':
      return `${baseUrl}/addRole`;
    default:
      return baseUrl;
  }
};
