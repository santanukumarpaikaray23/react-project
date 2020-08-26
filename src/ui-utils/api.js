import axios from "axios";
import { addQueryArg } from "./commons";
import { prepareFinalObject } from "../ui-redux/screen-configuration/actions";
import store from "../ui-redux/store";

// const getToken = () => {
//   const userInfo = JSON.parse(localStorage.getItem("user-info")) || {};
//   return userInfo.access_token;
// };

let axiosInstances = {
  instanceOne: axios.create({
    baseURL: process.env.NODE_ENV !== 'production'?window.location.origin:"http://ec2-13-127-71-22.ap-south-1.compute.amazonaws.com",

    headers: {
      "Content-Type": "application/json"
    }
  }),
};

const wrapRequestBody = requestBody => {
  return requestBody;
};
export const httpRequest = async ({
  method = "post",
  endPoint,
  queryObject = [],
  requestBody = {},
  instance = "instanceOne",
  hasSpinner = true,
  contentType = "application/json",
  headers={}
}) => {
  if (hasSpinner) {
    store.dispatch(prepareFinalObject("spinner", true));
  }
  let apiError = "Api Error";

  var headerConfig = {
    // "Content-Type": "application/json"
    headers
  };

  endPoint = addQueryArg(endPoint, queryObject);
  var response;
  try {
    switch (method) {
      case "post":
        response = await axiosInstances[instance].post(
          endPoint,
          wrapRequestBody(requestBody),
          headerConfig
        );
        break;
      default:
        response = await axiosInstances[instance].get(endPoint,headerConfig);
    }
    const responseStatus = parseInt(response.status, 10);
    if (hasSpinner) {
      store.dispatch(prepareFinalObject("spinner", false));
    }
    if (responseStatus === 200 || responseStatus === 201) {
      return response.data;
    }
  } catch (error) {
    console.log("err",error);
    const { data, status } = error.response;
    if (status && status === 400 && data && data === "") {
      apiError = "INVALID_TOKEN";
    }
    else {
      apiError = data;
    }
    if (hasSpinner) {
      store.dispatch(prepareFinalObject("spinner", false));
    }
  }

  return apiError;
};
