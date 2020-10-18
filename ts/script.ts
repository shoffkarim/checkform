/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import CheckForm from "./checkform";
// eslint-disable-next-line no-unused-vars
let valid: CheckForm = new CheckForm({ // init class
  custom: {
    nicknameReg: /^[a-zA-Z]/,
    nicknameMaxLength: 11
  },
  errorMessages: true,
  formClass: "checkform-form",
  blockClass: "block",
  errorClass: "block__error",
  labelClass: "block__label",
  btnClass: "checkform-btn",
  checkSubstr: [
    {
      id: "name", substr: "karim"
    },
    {
      id: "email", substr: "k4r1"
    }
  ],
  blackList: ["lol", "kek"]
});
