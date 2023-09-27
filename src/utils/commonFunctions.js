import { useEffect, useState } from "react";
import validator from "validator";
import swal from "sweetalert";
import { commonMessage } from "utils/commonMessage";
import FileSaver from "file-saver";

class commonFunctions {
  //  viewPass = ($this) => {
  //  $this.setState({passwordType:"text"});
  // }
  viewPass = ($this) => {
    if ($this.state.passwordType === "text") {
      $this.setState({ passwordType: "password" });
    } else {
      $this.setState({ passwordType: "text" });
    }
  };

  hidePass = ($this) => {
    $this.setState({ passwordType: "password" });
  };

  //  viewPassCon = ($this) => {
  //   $this.setState({passwordTypeCon:"text"});
  // }
  viewPassCon = ($this) => {
    if ($this.state.passwordTypeCon === "text") {
      $this.setState({ passwordTypeCon: "password" });
    } else {
      $this.setState({ passwordTypeCon: "text" });
    }
  };

  hidePassCon = ($this) => {
    $this.setState({ passwordTypeCon: "password" });
  };


  viewPasswordOrText = (currentValue,callback) => {
    var data="text";
    if (currentValue === "text") {
      data = "password";
    } 
    callback(data);
  };


  capitalizeFirstLetter = (e, $this) => {
    var str = e.target.value;
    const arr = str.split(" ");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const str2 = arr.join(" ");
    e.target.value = str2;
  };

  //Custom SUI select
  handleChangeCustomSelect = (e, $this) => {
    var stringValue = e.value;
    alert(stringValue);
  };

  urlPatternValidation = (e, $this) => {
    var websiteUrl = e.target.value;
    let regex =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
    const isTrueVal = regex.test(String(websiteUrl).toLowerCase());
    if (!isTrueVal) {
      $this.setState({ websiteError: "Please enter valid website name" });
    } else {
      $this.setState({ websiteError: "" });
    }
  };


  validateEmail = (e, $this, SN) => {
    let email = e.target.value;
    let emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (email !== "") {
      if (!emailReg.test(email)) {
        $this.setState({
          [SN]: "Invalid Email Address",
        });
      } else {
        if (email === "") {
          $this.setState({
            [SN]: "Invalid Email Address",
          });
        } else {
          $this.setState({
            [SN]: "",
          });
        }
      }
    }
  };

  validatePassword = (e, $this, SN, checkStrong = true, $pass) => {
    let password = e.target.value;
    let fieldName = e.target.name;
    var isDisabledVal = false;
    if (checkStrong) {
      if (password.length < 10) {
        $this.setState({
          [SN]: "Password is not Strong, Be at least 10 characters, include a lowercase letter, include an uppercase letter, include a number, No space allowed.",
        });
        isDisabledVal = true;
      } else if (
        password.length > 10 &&
        validator.isStrongPassword(password, {
          minLength: 10,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        $this.setState({ [SN]: "" });
      } else {
        $this.setState({
          [SN]: "Password is not Strong, Be at least 10 characters, include a lowercase letter, include an uppercase letter, include a number, No space allowed.",
        });
        isDisabledVal = true;
      }
    }
    if (!isDisabledVal) {
      if (
        fieldName === "password" &&
        ($this.state.confirm_password.length < 10 || $this.state.confirm_password_error === "")
      ) {
        isDisabledVal = true;
      } else if (fieldName === "confirm_password" && password === $pass) {
        isDisabledVal = false;
      } else if (fieldName === "confirm_password" && password !== $pass) {
        isDisabledVal = true;
      } else {
        $this.setState({ [SN]: "" });
        isDisabledVal = false;
      }
    }
    $this.setState({ isDisabled: isDisabledVal });
  };

  mobileFormat = (e, $this) => {
    var phoneNumberString = e.target.value;
    let isnum = /^\d+$/.test(phoneNumberString);
    if (!isnum) {
      $this.setState({ mobile_number_error: "Invalid Number" });
    } else {
      var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
      var match = cleaned.match(/^(91|)?(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        var intlCode = match[1] ? "(+91) " : "";
        e.target.value = [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
      }
    }
  };

  validate = ($this, elements) => {
    var isValid = true;
    for (let v = 0; v < elements.length; v++) {
      if (!$this.state[elements[v]]) {
        let SN = elements[v] + "_error";
        let ElementName = elements[v]
          .replace("_", " ")
          .toLowerCase()
          .replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
          });
        $this.setState({
          [SN]: `Please fill the ${ElementName}`,
        });
        isValid = false;
      }
    }
    if (isValid) {
      $this.setState({ isDisabled: false });
    }
    return isValid;
  };

  sendMail = ($to, $from, $subject, $body) => {
    window.Email.send({
      Host: "smtp.elasticemail.com",
      Username: "indiagreenlam@gmail.com",
      Password: "2923442E2CA7CEA5A30D603F398DE04E3E08",
      // To : "mvinodpal@gmail.com",
      To: $to,
      From: "indiagreenlam@gmail.com",
      Subject: $subject,
      Body: $body,
    }).then((message) => {
      message === "OK" ? alert("Email sent successfully") : alert(message);
    });
  };

  handleDelete = (fileRows, item, $this) => {
    const res = fileRows.filter((row) => {
      if (!(row.type === item.type && row.description === item.description)) {
        return row;
      }
    });
    $this.setState({ fileRows: res });
  };

  handleDeleteFile = (fileRows, item, $this) => {
    const res = fileRows.filter((row) => {
      if (!(row.filename === item.filename)) {
        return row;
      }
    });
    $this.setState({ fileRows: res });
  };

  handleDeleteFn = (fileRows, item, setState) => {
    const res = fileRows.filter((row) => {
      if (!(row.description === item.description)) {
        return row;
      }
    });
    return res;
  };

  handleClickObj = (Object, rowId, type) => {};

  handleClickArray = (arrayList, rowId, type) => {};

  // selectedValue = (arrayList,id) => {
  //   if(arrayList.length > 0){
  //   const filteredValues = arrayList.filter((item) => item.categoryId === id);
  //   const filteredValue = filteredValues[0];
  //   console.log("wwwwww",filteredValue);
  //   return filteredValue;
  //   }
  // }

  selectedArrayValue(arrayList, listColumn, value, callback) {
    //  var filterDatas="";
    // if(arrayList.length > 0){
    const filteredValues = arrayList.filter((item) => item.listColumn === value);
    const filterData = filteredValues[0];
    callback(filterData);
    //  }
    //  callback(filterDatas);
  }

  ResetForm = () => {
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  sweetConfirm = (type = "notification", sweetConfig, callback) => {
    if (type === "error") {
      /* Object Example = {heading:"Error Alert", subheading:" this is subheading of error alert"}*/
      swal(sweetConfig.heading, sweetConfig.subheading, "error");
    }

    if (type === "success") {
      /* Object Example = {heading:"Success Alert", subheading:" this is subheading of success alert"} */
      swal(sweetConfig.heading, sweetConfig.subheading, "success");
    }

    if (type === "confirm") {
      /* Object Example = {title:"confirm alert", message:" abcd", successMessage: "success messsage", failedMessage :" error mesage"}*/
      swal({
        title: sweetConfig.title,
        text: sweetConfig.message,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((confirmed) => {
        if (confirmed) {
          swal(sweetConfig.successMessage, {
            icon: "success",
          });
          callback(true);
        } else {
          if (sweetConfig.callBackFailed) {
            swal(sweetConfig.failedMessage);
          }
          if (sweetConfig.callBackFailedAction) {
            callback(false);
          }
        }
      });
    }

    if (type === "autoclose") {
      /* Object Name = {message:" abcd",returnMessage: "this is returnMessage"} */
      swal(sweetConfig.message).then((value) => {
        swal(sweetConfig.returnMessage);
      });
    }

    if (type === "prompt") {
      /* Object Name = {title:" abcd",buttonName: "this is returnMessage"}*/
      swal(sweetConfig.title, {
        buttons: [sweetConfig.buttonName, true],
      });
    }
  };

  fileUploadValidation = (e, allowedExtensionsType) => {
    const fileData = e.target.files[0];

    if (allowedExtensionsType === "images") {
      var re = new RegExp(/\.(jpg|jpeg|png|gif|PDF|pdf)$/, "g");
    } else if (allowedExtensionsType === "pdf") {
      var re = new RegExp(/\.(PDF|pdf)$/, "g");
    } else if (allowedExtensionsType === "csv") {
      var re = new RegExp(/\.(csv|CSV|xlsx|XLSX)$/, "g");
    } else {
      var re = new RegExp(/\.(jpg|jpeg|png|gif|PDF|pdf|csv|CSV|xlsx|XLSX)$/, "g");
    }

    if (!fileData) {
      this.sweetConfirm("error", {
        heading: commonMessage.common.invalidFile,
        subheading: commonMessage.common.validationError,
      });
      return false;
    }
    if (!fileData.name.match(re)) {
      this.sweetConfirm("error", {
        heading: commonMessage.common.invalidFile,
        subheading: commonMessage.common.validFileError,
      });
      return false;
    }
    if (fileData.size > 10e6) {
      this.sweetConfirm("error", {
        heading: commonMessage.common.invalidFile,
        subheading: commonMessage.common.fileSizeError,
      });
      return false;
    }
  };

  handleDownloadFile = (fileName, samepleName) => {
    let fn = fileName;
    if (samepleName === "company") {
      fn = "sampleCompany.csv";
    }
    FileSaver.saveAs(`../../../../../uploads/${fn}`, `${fn}`);
  };

  exportAsCSV = (filename, data) => {
    if (filename.length > 1) {
      let excludeClm = ["action"];
      let headerData = [Object.keys(data["rows"][0])];
      let finalArr = [];
      headerData = headerData[0].filter((itm) => {
        return !excludeClm.includes(itm);
      });
      data["rows"].forEach((r) => {
        let singleArr = [];
        for (let k in r) {
          if (!excludeClm.includes(k)) {
            singleArr.push(r[k].replace(/,/g, "."));
          }
        }
        finalArr.push(singleArr);
      });
      finalArr.unshift(headerData);
      console.log("final data:", finalArr);
      let csvContent = "data:text/csv;charset=utf-8," + finalArr.map((e) => e.join(",")).join("\n");
      var encodedUri = encodeURI(csvContent);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `${filename}.csv`);
      document.body.appendChild(link);
      link.click();
    } else {
      console.info("File name is not correct");
    }
  };

  
 maskString = (str, start, end) =>{
  var maskedValue = '';
  for (let i = 0; i < str.length; i++) {
    if (i >= start && i <= end) {
      maskedValue += '*';
    } else {
      maskedValue += str[i];
    }
  }
  return maskedValue;
}

}
export default commonFunctions;
