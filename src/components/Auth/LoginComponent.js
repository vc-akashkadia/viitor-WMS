import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { getUrl } from "../../services/network/urls";
import { post } from "../../services/network/requests";
import {Form} from "react-bootstrap"
import {Toaster} from '@utilities'
const initialValues = {
  email: "admin",
  password: "admin",
};
let toasterOption = {
  option : 'error',
  message:''
}
export default function Login(props) {
  const history = useHistory()
  // const { intl } = props;
  // const isMobile = useMediaQuery('(max-width: 600px)');
  const [tosterShow, setToaster] = useState(false);
  const [loading, setLoading] = useState(false);
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("User name required"),
    password: Yup.string()
      .min(3, "Minimum 3 symbols")
      .max(50, "Maximum 50 symbols")
      .required("Password is required"),
  });

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "User Name is required";
    }
   if (!values.password) {
      errors.number = "Password is required";
    } else if (values.password.length < 5) {
      errors.number = "Minimum 5 symbols";
    }else if (values.password.length > 51) {
      errors.number = "Maximum 50 symbols";
    }
    return errors;
  };

  const enableLoading = () => {
    setLoading(true);
  };

  const disableLoading = () => {
    setLoading(false);
  };

  

  const {
    handleSubmit,
    isSubmitting,
    errors,
    touched,
    status,
    getFieldProps
  } = useFormik({
    initialValues,
    //validate,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      enableLoading();
      
        let url = getUrl("signin");
        let data = {
            'username': values.email,
           'password': values.password,
        };
        post(url, data,{})
          .then(response => {
            console.log(response)
            const{ data : {status,data,message }} = response

            console.log('status',status)
            console.log('data',data)
            console.log('message',message)
            if(status){
              toasterOption = {
                option : 'success',
                message:message
              }
              setTimeout(() => {
                props.login({
                  authToken : data[0].token,
                  user : {
                    fullname : data[0].username,
                    isAdmin : data[0].admin
                  }
                })
                
              }, 1500);
            }
            disableLoading(); 
          })
          .catch((err) => {
            disableLoading();
            setSubmitting(false);
            toasterOption = {
              option : 'error',
              message:'Invalid Login'
            }
            
          });
          
      
    },
  });
  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      {/* begin::Head */}
      {/* <div className="text-center mb-10 mb-lg-20">
                <h3 className="font-size-h1">
                    <FormattedMessage id="AUTH.LOGIN.TITLE" />
                </h3>
                
            </div> */}
      {/* end::Head */}

      {/*begin::Form*/}
      <form
        onSubmit={handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework"
      >
        {status && (
          <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
            <div className="alert-text font-weight-bold">{status}</div>
          </div>
        )}

        <Form.Group className="fv-plugins-icon-container mb-1">

          
          <Form.Label><b>Username</b> </Form.Label>
          <Form.Control type="text" placeholder="Enter email" {...getFieldProps("email")} />
        

          {touched.email && errors.email ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{errors.email}</div>
            </div>
          ) : null}
        </Form.Group>
        
          <Form.Group className="fv-plugins-icon-container mb-1" controlId="formBasicPassword">
            <Form.Label><b>Password</b></Form.Label>
            <Form.Control type="password" placeholder="Password"  {...getFieldProps("password")} />
            {touched.password && errors.password ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{errors.password}</div>
            </div>
          ) : null}
          </Form.Group>
         
          
        
        <div className="d-flex justify-content-center">
          <button
            id="kt_login_signin_submit"
            type="submit"
            disabled={isSubmitting}
            className={`btn btn-primary font-weight-bold px-9 py-4 my-3`}
          >
            <span>Sign In</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
      <Toaster
        visibility={tosterShow}
        duration={6000}
        handleClose={() => setToaster(false)}
        variant={toasterOption.option}
        message={toasterOption.message}
      />
    </div>
  );
}
