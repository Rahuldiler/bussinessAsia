import FileSaver from "file-saver";
import React from "react";
import axios from "axios";
import { ACCESS_TOKEN, LOGGED_IN_USER_ROLE } from "../global";
import { ApiEndPoints } from "./EndPoints";
import ApiCommon from "../utils/ApisCommon";
import Config from "../config";
const apiBaseUrl = Config.apiBaseUrl;
const apiBaseUrlFileUpload = Config.apiBaseUrlFileUpload;
const apis = new ApiCommon();
// File Download common function use anywhere
export const handleFileDownload = (item) => {
  //const id1 = event.target.id;
  if (Object.keys(item).length);
  const documentName = item.documentName;
  const id = item.documentId;
  axios({
    url: `${apiBaseUrlFileUpload}ssa/files/` + id,
    method: "get",
    responseType: "blob",
    headers: {
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      Accept: "application/vnd.openxmlformats-officedocument" + ".spreadsheetml.sheet",
    },
  }).then(function (response) {
    FileSaver.saveAs(response.data, documentName);
  });
  console.log(id);
};

// File Download common function use with file id
export const handleFileDownloadWithId = (id, documentName) => {
  axios({
    url: `${apiBaseUrlFileUpload}ssa/files/` + id,
    method: "get",
    responseType: "blob",
    headers: {
      Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
      Accept: "application/vnd.openxmlformats-officedocument" + ".spreadsheetml.sheet",
    },
  }).then(function (response) {
    //  FileSaver.saveAs(response.data, response.data.documentName);
    FileSaver.saveAs(response.data, documentName);
  });
  console.log(id);
};
