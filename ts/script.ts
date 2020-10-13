/* eslint-disable no-undef */
import { CheckForm } from "./checkform";
// eslint-disable-next-line no-unused-vars
let valid: CheckForm = new CheckForm(".checkform-wrapper", { // init class
  renderForm: true,
  inputs: [
    {
      id: "email", type: "text", class: "block__input", placeholder: "enter your email", label: "enter your email", error: "incorrect email"
    },
    {
      id: "fullname", type: "text", class: "block__input", placeholder: "enter your name", label: "enter your name", error: "incorrect name"
    },
    {
      id: "password", type: "password", class: "block__input", placeholder: "password", label: "password", error: "incorrect password"
    },
    {
      id: "tel", type: "tel", class: "block__input", placeholder: "number", label: "number", error: "incorrect number"
    },
    {
      id: "date", type: "text", class: "block__input", placeholder: "date", label: "date", error: "incorrect date"
    }, // must indicate type text for date, for good animation
    {
      id: "checkbox", type: "checkbox", class: "block__input", placeholder: "checkbox", label: "checkbox", error: "incorrect check"
    },
    {
      id: "file", type: "file", class: "block__input", placeholder: "file", label: "file", error: "incorrect file"
    }

  ],
  textarea: [
    {
      id: "textarea", class: "block__message", placeholder: "message", label: "enter your message", error: "incorrect message"
    },
  ],
  btn: [
    {
      class: "btn", type: "submit", text: "submit"
    }
  ],
  custom: [
    {
      nickname: {
      reg: /^[a-zA-Z]/,
      maxLength: 11
    }
  },
  ],
  errorMessages: true,
  formClass: "validator-form",
  blockClass: "block",
  errorClass: "block__error",
  labelClass: "block__label",
  btnClass: "validator-btn",
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
