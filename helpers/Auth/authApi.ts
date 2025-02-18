import {
    TBasicSignupFormInputs,
    TVerifyEmail,
  } from "@/types/Auth.types";
  import axios from "axios";
//   import { TEMP_BACKEND_URI } from "../../globalConstants";
  
  
  
  export const handleBasicSignup = async (data: TBasicSignupFormInputs) => {
    // const response = await axios.post(`${TEMP_BACKEND_URI}/auth/register`, data, {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // console.log(response.data);
    // return response.data;
  };
  
  export const handleOtp = async (data: TVerifyEmail) => {
    // const response = await axios.post(
    //   `${TEMP_BACKEND_URI}/auth/register/verify-email`,
    //   data,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   }
    // );
    // return response.data;
  };
  
  
  export const handleResendOTP = (data: string) => {
    // const response = axios.post(
    //   `${TEMP_BACKEND_URI}/email-service/send-verfication-email?emailAddress=${data}`
    // );
  
    // return response;
  };
  