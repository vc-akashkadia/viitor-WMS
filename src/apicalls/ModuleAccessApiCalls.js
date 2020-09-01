import { getUrl } from "../services/network/urls";
import { post, get } from "../services/network/requests";

export const AddRoleApi = (data,authtoken,callback) => {
    let url = getUrl("addRole");
        post(url,data,true).then(response => {
          callback(response)
          
        })
        .catch((err) => {
          console.log('err => ',err)
        });
      
}