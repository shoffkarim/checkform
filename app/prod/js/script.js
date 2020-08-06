/* eslint-disable no-case-declarations */
let validObj = { // object for abstract programming
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
      // eslint-disable-next-line no-useless-escape
      russian: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
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
let inputsList = document.querySelectorAll(".block__input"); // list of all inputs
// let textarea = document.querySelector(".block__message");
function RegCheck(reg, val, input) { // function for check regexp
  if (!reg.test(val)) {
    showErrorMessage(input);
    input.classList.add("error");
    input.classList.remove("good");
  } else {
    deleteErrorMessage(input);
    input.classList.remove("error");
    input.classList.add("good");
  }
}
function CreateErrorMessage(input) { // creation error message in every input
  let mesError = document.createElement("div");
  mesError.className = `block__error ${input.id}`;
  mesError.innerHTML = `Incorrect ${input.id}`;
  input.before(mesError);
}
function showErrorMessage(input) { // showing error message when uncorrect value
  let errorBlock = input.previousElementSibling;
  errorBlock.style.display = 'block';
  errorBlock.style.opacity = '1';
}
function deleteErrorMessage(input) { // hide error message when correct value
  let errorBlock = input.previousElementSibling;
  errorBlock.style.display = 'none';
  errorBlock.style.opacity = '0';
}
function createNameFile(input, name) { // creation file name in block file
  let nameFile = document.createElement("p");
  nameFile.className = "file-name";
  nameFile.innerHTML = name;
  let label = input.parentNode.firstElementChild;
  label.after(nameFile);
}
inputsList.forEach((i) => i.addEventListener("blur", function () { // functions for animation label in focus/blur
  this.classList.remove('js-input-focus');
  if (this.classList.contains("date")) { // special for type date, becouse it has placeholder dd.mm.gggg
    this.type = "text";
  }
  if (this.value !== "") {
    this.classList.add("js-input-focus");
  }
}));
inputsList.forEach((i) => i.addEventListener("focus", function () { // functions for animation label in focus/blur
  this.classList.add('js-input-focus');
  if (this.classList.contains("date")) { // special for type date, becouse it has placeholder dd.mm.gggg
    this.type = "date";
  }
}));
(function () { // main func
  inputsList.forEach(function (input) {
    if (input.value !== "") { // anim label if value saved after reload page
      input.classList.add("js-input-focus");
    }
    CreateErrorMessage(input); // creation error messages when page start
    input.addEventListener('change', function () { // validation on change value
      let val = input.value;
      switch (input.getAttribute("id")) { // all inputs should have id
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
          else deleteErrorMessage(input);
          break;
        case "file":
          let file = input.files[0];
          console.log(file.name);
          if (val === "") showErrorMessage(input); // check for empty
          else if (!file.type.startsWith(validObj.file.type.image)) { // check for type of file
            showErrorMessage(input);
            if (!(file.size < validObj.file.size.mb10)) showErrorMessage(input); // check size file
          } else {
            createNameFile(input, file.name); // creation file name if file correct
            input.classList.remove("error");
            input.classList.add("good");
            deleteErrorMessage(input);
          }
          break;
        default:
          console.log("def");
      }
    });
  });
}());
