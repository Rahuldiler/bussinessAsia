import { formatDate } from "./customDate";
import colors from "assets/theme/base/colors";
import moment from "moment";

const lT = ["#f8f9fa", "#FFFFFF", "#f0f2f5", "#FFF8E1"];
const dT = ["#00071e"];

export const CITIZEN_TOKEN_COOKIE_NAME = "dsToken";
export const servicePath = "http://localhost:7081/";
export const ACCESS_TOKEN = "accessToken";
export const ACTIVE_THEME = lT.includes(colors.background.default) ? "light" : "dark";
export const rowsPerPageCommon = "10";
const Cryptr = require("cryptr");
var CryptoJS = require("crypto-js");

export const cryptr = new Cryptr("MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrdwJEz7WjQXl8Co");

//Password hashing
export const cryptrPassword = new Cryptr("MIGfMA0GCSqGSIb3DQEBAQU", {
  pbkdf2Iterations: 5,
  saltLength: 15,
});

export const crpt = (text = null) => {
  if (text !== null) {
    return CryptoJS.AES.encrypt(text, "UmFIdUx@2SW5PZA").toString();
  } else {
    return null;
  }
};

export const dcrpt = (cipher = null) => {
  if (cipher !== null) {
    var bytes = CryptoJS.AES.decrypt(cipher, "UmFIdUx@2SW5PZA");
    return bytes.toString(CryptoJS.enc.Utf8);
  } else {
    return null;
  }
};

const decryptedString = localStorage.userData
  ? cryptr.decrypt(localStorage.getItem("userData"))
  : null;
export const loginUserDetails = decryptedString ? JSON.parse(decryptedString) : null;
export const LOGGED_IN_USER_ROLE = loginUserDetails ? `${loginUserDetails.role_id}` : null;
export const LOGGED_IN_USER_ID = loginUserDetails ? `${loginUserDetails.id}` : null;

// Mask Any String
export function maskDetails(mastString, maskAll = false) {
  if (maskAll) {
    return mastString.replace(/^(.*)$/, (_, b) => b.replace(/./g, "*"));
  }
  if (mastString && mastString.includes("@")) {
    return mastString.replace(/^(.)(.*)(@.*)$/, (_, a, b, c) => {
      if (a.length === 1) {
        return a.replace(/./g, "*") + b.replace(/./g, "*") + c;
      } else {
        return a + b.replace(/./g, "*") + c;
      }
    });
  }
  if (mastString) {
    const length = mastString.length * 0.6;
    const firstFragment = mastString.substring(0, length);
    const lastFragment = mastString.substring(length + 1, mastString.length);
    return firstFragment.replace(/([a-zA-Z0-9])/g, "*") + lastFragment;
  }
  return "";
}

export function numberWithThousandSeparator(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getNumberWithFixedDecimalPoints(number, fixedDecimalPoints) {
  number = number ? number : 0;

  switch (typeof number) {
    case "number":
      break;
    case "string":
      number = parseFloat(number);
      break;
    case "boolean":
      number = 0;
      break;
    case "undefined":
    default:
      return NaN;
  }
  number = number.toFixed(fixedDecimalPoints);
  return number;
}

// Number formate start
export const numberFormat = (value) => new Intl.NumberFormat().format(value);
// Number formate end

// Check array empty
export const isEmptys = (arr) => !Array.isArray(arr) || arr.length === 0;

//Remove duplicate values in an array
export const removeDuplicate = (arr) => arr.filter((i) => arr.indexOf(i) === arr.lastIndexOf(i));

//shuffle List
export const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());

//Calculate the number of difference days between two dates
export const diffDays = (date, otherDate) =>
  Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
//diffDays(new Date('2014-12-19'), new Date('2020-01-01')); // 1839

//Calculate the number of months between two dates
export const monthDiff = (startDate, endDate) =>
  Math.max(
    0,
    (endDate.getFullYear() - startDate.getFullYear()) * 12 -
      startDate.getMonth() +
      endDate.getMonth()
  );

//monthDiff(new Date('2020-01-01'), new Date('2021-01-01')); // 12
//Get the timezone string
export const getTimezone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;
export const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
//Convert a string to URL slug
export const slugify = (string) =>
  string
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");

//Get the number of a character in a string
export const characterCount = (str, char) =>
  str.replace(new RegExp(String.raw`[^${char}]`, "g"), "").length;
export function slugifyString(string) {
  return (
    string &&
    `${string}`
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map((x) => x.toLowerCase())
      .join("-")
  );
}

export function checkEmptyObject(obj) {
  if (obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype) {
    return true;
  } else {
    return false;
  }
}
function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}

export function dateConvertDBtoUI(timestamp = "") {
  if (timestamp === "") {
    return "-";
  } else {
    return moment(timestamp).format("dddd, MMMM Do, YYYY h:mm:ss A");
  }
}

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

export const isEmpty = (value) => {
  if (typeof value === "undefined") {
    return true;
  }
  if (value === null) {
    return true;
  }
  if (typeof value === "object" && Object.keys(value).length === 0) {
    return true;
  }

  if (Array.isArray(value) && value.length === 0) {
    return true;
  }

  if (typeof value === "string" && value.trim().length === 0) {
    return true;
  }
  return false;
};

export const isEmptyOtherValue = (value, returnValue) => {
  if (typeof value === "undefined" || value === null) {
    return returnValue;
  }
  if (typeof value === "object" && Object.keys(value).length === 0) {
    return returnValue;
  }
  if (Array.isArray(value) && value.length === 0) {
    return returnValue;
  }
  if (typeof value === "string" && value.trim().length === 0) {
    return returnValue;
  }
  return value;
};

export const uniqueIdGenerate = () => {
  const uuId = uuid();
  const randomeNumber = Math.floor(Math.random() * 10000000);
  return uuId + "" + randomeNumber;
};
