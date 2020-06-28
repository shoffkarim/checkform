/* eslint-disable no-case-declarations */
let validObj = {
  nickname: {
    reg: /^[a-zA-z_-]$/,
  },
  email: {
    reg: /^(?!.*@.*@.*$)(?!.*@.*--.*..*$)(?!.*@.*-..*$)(?!.*@.*-$)(.*@.+(..{1,11})?)$/,
  },
  password: {
    reg: {
      b6: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
    },
  },
  date: {
    reg: {
      first: /^\d{4}[./-]\d{2}[./-]\d{2}$/,
      sec: /^\d{2}[./-]\d{2}[./-]\d{4}$/,
    },
  },
  tel: {
    reg: {
      russian: /^((\+?7|8)[ \-] ?)?((\(\d{3}\))|(\d{3}))?([ \-])?(\d{3}[\- ]?\d{2}[\- ]?\d{2})$/,
      american: /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/,
    },
  },
  file: {
    size: {
      mb10: 10025711,
    },
    type: {
      image: "image",
    },
  },
};
let btn = document.querySelector(".btn");
btn.addEventListener("click", validator, false);

function RegCheck(reg, val, input) {
  if (!reg.test(val)) {
    console.log(`incorrect ${input}`);
  }
}

function validator(evt) {
  evt.preventDefault();
  let inputs = document.querySelectorAll(".block__input");
  inputs.forEach(function (input) {
    let val = input.value;
    switch (input.getAttribute("id")) {
      case "name":
        let nameReg = new RegExp(validObj.nickname.reg);
        if (val.length <= 4 || val.length >= 16) {
          console.log("short name or too long");
          RegCheck(nameReg, val, "name");
        }
        break;
      case "email":
        let emailReg = new RegExp(validObj.email.reg);
        RegCheck(emailReg, val, "email");
        break;
      case "password":
        let passwordReg = new RegExp(validObj.password.reg.b6);
        RegCheck(passwordReg, val, "password");
        break;
      case "date":
        let dateReg = new RegExp(validObj.date.reg.first);
        RegCheck(dateReg, val, "date");
        break;
      case "tel":
        let telReg = new RegExp(validObj.tel.reg.russian);
        RegCheck(telReg, val, "tel");
        break;
      case "check":
        if (!input.checked) console.log("not checked");
        break;
      case "file":
        let file = input.files[0];
        if (val === "") console.log("not file");
        else if (!file.type.startsWith(validObj.file.type.image)) {
          console.log("incorrect format of file");
          if (!(file.size < validObj.file.size.mb10)) console.log("big size of file");
        }
        break;
      default:
        console.log("def");
    }
  });
}
