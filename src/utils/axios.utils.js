import axios from "axios";
// import { toast } from "react-toastify";
import constants from "./constants";
// import store from "../redux/store";
// import { logout } from "../redux/reducers/authReducer";

function axiosInterceptor() { 
  let token = localStorage.getItem("SAVE_PASS_TOKEN");
  axios.defaults.baseURL = constants.REST_CONFIG.F_BINANCE_URL;
  axios.defaults.headers.common["Authorization"] = token;

  axios.interceptors.request.use(
    function (config) { 
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error 
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      if (!response?.data?.success) {
        toast.error(response?.data?.message);
        return Promise.reject(response?.data?.message);
      }
      if (response?.data?.success) {
        if (response?.data?.message) {
          toast.success(response?.data?.message);
        }
      }
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      if (error.response) {
        if (error.response.status === 401) {
        //   store.dispatch(logout())
        }
      }
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );
}

export default axiosInterceptor;