/* eslint-disable no-case-declarations */
let btn = document.querySelector(".btn");
btn.addEventListener("click", validator, false);

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
          if (!nameReg.test(val)) {
            console.log("incorrect symbol");
          }
        }
        break;
      case "email":
        let emailReg = new RegExp(
          /^(?!.*@.*@.*$)(?!.*@.*--.*..*$)(?!.*@.*-..*$)(?!.*@.*-$)(.*@.+(..{1,11})?)$/
        );
        if (!emailReg.test(val)) {
          console.log("incorrect email");
        }
        break;
      case "password":
        let passwordReg = new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/
        );
        if (!passwordReg.test(val)) {
          console.log("incorrect password");
        }
        break;
      case "date":
        let dateReg = new RegExp(/^\d{4}[./-]\d{2}[./-]\d{2}$/);
        if (!dateReg.test(val)) {
          console.log("incorrect date");
        }
        break;
      case "tel":
        let telReg = new RegExp(
          /^((\+?7|8)[ \-] ?)?((\(\d{3}\))|(\d{3}))?([ \-])?(\d{3}[\- ]?\d{2}[\- ]?\d{2})$/
        );
        if (!telReg.test(val)) {
          console.log("incorrect tel");
        }
        break;
      case "check":
        if (input.checked) {
          console.log("ok");
        } else console.log("not checked");
        break;
      case "file":
        if (
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
