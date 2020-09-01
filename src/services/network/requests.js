import axios from "axios";
// import { typeOf } from "react-is";
// axios.defaults.withCredentials = true;
const services = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const servicesForData = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    
  },
  crossDomain : true,
  xhrFields: {
      withCredentials: true
  },
});

export const get = (url, useToken = true) => {
  const headers = tokenHeaders(useToken);
  return services.get(url,headers);
};

const tokenHeaders = (useToken) =>{
  let token ;
  if (typeof(useToken) === 'string'){
    token = {
      headers: {
        'Authorization': 'Bearer '+ useToken,
      }
    }
  }else{
    token = useToken
  }
  return token;
}

export const post = (url, data, useToken) => {
  const headers = tokenHeaders(useToken);
  return services.post(url, data,headers);
};

export const postFormData = (url, data, useToken = false) => {
  const headers = tokenHeaders(useToken);
  return servicesForData.post(url, data,headers);
};

export const putFormData = (url, data, useToken = false) => {
  //const headers = tokenHeaders(useToken);
  return servicesForData.put(url, data);
};

export const put = (url, data, useToken = false) => {
  //const headers = tokenHeaders(useToken);
  return services.put(url, data);
};

export const remove = (url, data, useToken = false) => {
  //const headers = tokenHeaders(useToken);
  return services.delete(url, data);
};
