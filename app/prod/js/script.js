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
btn.addEventListener("click", validator);

function RegCheck(reg, val, input) {
  if (!reg.test(val)) {
    CreateErrorMessage(input);
  } else {
    input.classList.remove("error");
    input.classList.add("good");
  }
}

function CreateErrorMessage(input) {
  let mesError = document.createElement("div");
  mesError.className = `block__error ${input.id}`;
  mesError.innerHTML = `Incorrect ${input.id}`;
  input.before(mesError);
  input.classList.add("error");
  btn.addEventListener("click", validator);
}
function validator(evt) {
  evt.preventDefault();
  console.log(1);
  btn.removeEventListener("click", validator);
  let inputs = document.querySelectorAll(".block__input");
  inputs.forEach(function (input) {
    let val = input.value;
    switch (input.getAttribute("id")) {
      case "name":
        let nameReg = new RegExp(validObj.nickname.reg);
        if (val.length <= 4 || val.length >= 16) {
          CreateErrorMessage(input);
          RegCheck(nameReg, val, input);
        }
        break;
      case "email":
        let emailReg = new RegExp(validObj.email.reg);
        RegCheck(emailReg, val, input);
        break;
      case "password":
        let passwordReg = new RegExp(validObj.password.reg.b6);
        RegCheck(passwordReg, val, input);
        break;
      case "date":
        let dateReg = new RegExp(validObj.date.reg.first);
        RegCheck(dateReg, val, input);
        break;
      case "tel":
        let telReg = new RegExp(validObj.tel.reg.russian);
        RegCheck(telReg, val, input);
        break;
      case "check":
        if (!input.checked) CreateErrorMessage(input);
        break;
      case "file":
        let file = input.files[0];
        if (val === "") CreateErrorMessage(input);
        else if (!file.type.startsWith(validObj.file.type.image)) {
          CreateErrorMessage(input);
          if (!(file.size < validObj.file.size.mb10)) CreateErrorMessage(input);
        }
        break;
      default:
        console.log("def");
    }
  });
}
