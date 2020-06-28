/* eslint-disable no-case-declarations */
let validObj = {
  date: {
    types: {
      first: /^\d{4}[./-]\d{2}[./-]\d{2}$/,
      sec: /^\d{2}[./-]\d{2}[./-]\d{4}$/,
    },
  },
  tel: {
    types: {
      russian: /^((\+?7|8)[ \-] ?)?((\(\d{3}\))|(\d{3}))?([ \-])?(\d{3}[\- ]?\d{2}[\- ]?\d{2})$/,
      american: /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/,
    },
  },
};
let btn = document.querySelector(".btn");
btn.addEventListener("click", validator, false);

function RegCheck(reg, val, input) {
  if (!reg.test(val)) {
    console.log("incorect " + input);
  }
}

function validator(evt) {
  evt.preventDefault();
  let inputs = document.querySelectorAll(".block__input");
  inputs.forEach(function (input) {
    let val = input.value;
    switch (input.getAttribute("id")) {
      case "name":
        let nameReg = new RegExp(/^[a-zA-z_-]$/);
        if (val.length <= 4 || val.length >= 16) {
          console.log("short name or too long");
          RegCheck(nameReg, val, "name");
        }
        break;
      case "email":
        let emailReg = new RegExp(
          /^(?!.*@.*@.*$)(?!.*@.*--.*..*$)(?!.*@.*-..*$)(?!.*@.*-$)(.*@.+(..{1,11})?)$/
        );
        RegCheck(emailReg, val, "email");
        break;
      case "password":
        let passwordReg = new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/
        );
        RegCheck(passwordReg, val, "password");
        break;
      case "date":
        let dateReg = new RegExp(validObj.date.types.first);
        RegCheck(dateReg, val, "date");
        break;
      case "tel":
        let telReg = new RegExp(validObj.tel.types.russian);
        RegCheck(telReg, val, "tel");
        break;
      case "check":
        if (input.checked) {
          console.log("ok");
        } else console.log("not checked");
        break;
      case "file":
        if (val === "") console.log("not file");
        else if (
          input.files[0].type === "image/png" ||
          input.files[0].type === "image/jpg"
        ) {
          if (input.files[0].size < 10025711) {
            console.log("ok");
          } else console.log("big size of file");
        } else console.log("incorrect format of file");
        break;
      default:
        console.log("def");
    }
  });
}
