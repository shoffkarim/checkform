/* eslint-disable no-case-declarations */
let validObj = { //объект для абстракции
  nickname: {
    reg: /^[а-яА-Я]/,
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


let inputsList = document.querySelectorAll(".block__input");

function RegCheck(reg, val, input) {
  if (!reg.test(val)) {
    showErrorMessage(input);
    input.classList.add("error");
    input.classList.remove("good");
  } else {
    input.classList.remove("error");
    input.classList.add("good");
    deleteErrorMessage(input);
  }
};

function CreateErrorMessage(input) { 
  let mesError = document.createElement("div");
  mesError.className = `block__error ${input.id}`;
  mesError.innerHTML = `Incorrect ${input.id}`;
  input.before(mesError);
};
function showErrorMessage(input){
  var errorBlock = input.previousElementSibling;
  errorBlock.style.display = 'block';
  errorBlock.style.opacity = '1';
}
function deleteErrorMessage(input){
  var errorBlock = input.previousElementSibling;
  errorBlock.style.display = 'none';
  errorBlock.style.opacity = '0';
};
var validatorInit = function(){
  let inputsList = document.querySelectorAll(".block__input");
  inputsList.forEach(function(input){
    CreateErrorMessage(input)
    input.addEventListener('change', function(){
      let val = input.value;
      switch (input.getAttribute("id")) {
        case "name":
          let nameReg = new RegExp(validObj.nickname.reg);
          RegCheck(nameReg, val, input);
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
          if (!input.checked) showErrorMessage(input);
          break;
        case "file":
          let file = input.files[0];
          if (val === "") showErrorMessage(input);
          else if (!file.type.startsWith(validObj.file.type.image)) {
            showErrorMessage(input);
            if (!(file.size < validObj.file.size.mb10)) showErrorMessage(input);
          }
          else {
            input.classList.remove("error");
            input.classList.add("good");
            deleteErrorMessage(input);
          }
          break;
        default:
          console.log("def");
      }
    })
  });
}();
