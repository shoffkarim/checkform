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
        console.log(val);
        break;
      case "tel":
        console.log(val);
        break;
      case "check":
        console.log(val);
        break;
      case "file":
        console.log(val);
        break;
      case "message":
        console.log(val);
        break;
      default:
        console.log("def");
    }
  });
}
