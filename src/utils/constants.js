// export const loginUserData = () => {
//   return JSON.parse(localStorage.getItem("userData"));
// };

const CryptoJS  =   require("crypto-js");
const key       =   '8fac2bb68ff0a57ee01d379a92ebf5d0e65a4648';

const encrypt = (text) =>{
    return CryptoJS.AES.encrypt(text, key).toString();
}

const decrypt = (value)=>{    
    return (CryptoJS.AES.decrypt(value, key)).toString(CryptoJS.enc.Utf8);
}

export default { encrypt, decrypt}



//  const Cryptr = require("crypto-js");
//   export const cryptr = new Cryptr(
//     "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCrdwJEz7WjQXl8Co+WBqaWY43VRQZzoisY7JQgIBADANBgkqhkiG9w0BAQEFAASCCSwwggkoAgEAAoICAQCySJKRsVqNFupMHbdrhJCbPBsPe6My7j6pl8t48dulZp"
//   );

  //const decryptedString = localStorage.userData ? decrypt(localStorage.getItem("userData")) : null;
  const decryptedString = localStorage.userData ? JSON.parse(localStorage.getItem("userData")) : null;
  export const loginUserDetails = decryptedString ? decryptedString : null;


// export const constHeaders = {
//   "Content-Type": "application/json",
//   "Access-Control-Allow-Origin": "*",
//   Authorization: "Bearer " + localStorage.getItem(ACCESS_TOKEN),
// };

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