import Config from "./config";
import { ACCESS_TOKEN, loginUserDetails, LOGGED_IN_USER_ROLE } from "./global";
import commonFunctions from "./commonFunctions";
import { post } from "axios";
import { endPoints } from "./endPoints";

const axios = require("axios");
const baseUrl = Config.apiBaseUrl;
const apiBaseUrlFileUpload = Config.apiBaseUrlFileUpload;

class apiCommon {
  headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
  };

  exportCsvFileUrls = {};

  constructor() {
    if (localStorage.loginUser) {
      const loginUser = loginUserDetails;
      axios.defaults.headers.common["token"] = loginUser.accessToken;
      const token = encodeURIComponent(loginUser.token);
      this.exportCsvFileUrls = {
        users: baseUrl + "users/export?token=" + token,
      };
    }
    this.initLoader();
  }

  initLoader() {
    axios.interceptors.request.use(
      function (config) {
        document.body.classList.add("loading-indicator");
        // const token = window.localStorage.token;
        // if (token) {
        //    config.headers.Authorization = `token ${token}`
        // }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      function (response) {
        document.body.classList.remove("loading-indicator");
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );
  }

  postRequest = (payload) => {
    return axios
      .post(payload.url, payload.data, { headers: this.headers })
      .catch(function (error) {
        //  alert(error);
        var cf = new commonFunctions();
        cf.sweetConfirm("error", {
          heading: error,
          subheading: error,
        });
        // return false;
        return { error: error };
      })
      .finally(function () {
        // console.log('Finally post');
      });
  };

  getRequest = (payload) => {
    return axios
      .get(payload.url, { params: payload.data })
      .catch(function (error) {
        return { error: error };
      })
      .finally(function (res) {
        // console.log(res);
      });
  };

  // Use  this method request common get and post API
  actionCommonRequest(data, action_type, method, stringify = false) {
    if (stringify === "true") {
      data = JSON.stringify(data);
    }
    const payload = {
      url: baseUrl + action_type,
      data: data,
    };
    if (method === "post") {
      return this.postRequest(payload);
    } else if (method === "get") {
      return this.getRequest(payload);
    } else {
      alert("Please pass argument method type: get or post");
    }
  }

  getLoginUserRole() {
    return parseInt(loginUserDetails.userRole);
  }

  loginUserDetails() {
    return loginUserDetails;
  }

  isAllowAddEdit(AllowArr) {
    const userRole = this.getLoginUserRole();
    if (AllowArr.indexOf(userRole) > -1) {
      return true;
    }
    return false;
  }

  getRandomNumber() {
    return new Date().getTime() + Math.floor(Math.random() * (99999999 - 1 + 1)) + 1;
  }
}
export default apiCommon;
