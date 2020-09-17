export default class CreateForm {
  constructor(el, options) {
    this.el = document.querySelector(el);
    this.options = options;
    this.render();
  }

  render() {
    const { renderForm } = this.options;
    if (renderForm) { // if user use render form
      this.el.innerHTML = this.getTemplate(this.options);
    }
  }

  getTemplate() { // method what return inputs, button, and full form
    return `<form class="${this.options.formClass}" method="POST">
              ${this.getTemplateInput().join('')}
              ${this.getTemplateText().join('')}
              ${this.getTemplateBtn().join('')}
            </form>`;
  }

  getTemplateInput() {
    const input = this.options.inputs.map((i) => { // template of input
      if (this.options.errorMessages) {
        return `<div class="${this.options.blockClass}">
                  <div class="${this.options.errorClass} error-${i.id}">${i.error}</div>
                  <input class="validator ${i.class} ${i.id}" data-type="${i.id}" data-valid="true" type="${i.type}" placeholder="${i.placeholder}" id="${i.id}"/>
                  <label class="${this.options.labelClass} label-${i.id}" for="${i.id}">${i.label}</label>
                  </div>`;
      }
      return `<div class="${this.options.blockClass}">
                <input class="validator ${i.class} ${i.id}" data-type="${i.id}" data-valid="true" type="${i.type}" placeholder="${i.placeholder}" id="${i.id}"/>
                <label class="${this.options.labelClass} label-${i.id}" for="${i.id}">${i.label}</label>
              </div>`;
    });
    return input;
  }

  getTemplateText() {
    const text = this.options.textarea.map((i) => { // template of textarea
      if (this.options.errorMessages) {
        return `<div class="${this.options.blockClass}">
                  <div class="${this.options.errorClass} error-${i.id}">${i.error}</div>
                  <textarea class="validator block__input ${i.class}" data-valid="true" placeholder="${i.placeholder}" id="${i.id}"></textarea>
                  <label class="${this.options.labelClass} label-${i.id}" for="${i.id}">${i.label}</label>
                </div>`;
        }
      return `<div class="${this.options.blockClass}">
                <textarea class="validator block__input ${i.class}" data-valid="true" data-type="${i.id}" placeholder="${i.placeholder}" id="${i.id}"></textarea>
                <label class="${this.options.labelClass} label-${i.id}" for="${i.id}">${i.label}</label>
              </div>`;
    });
    return text;
  }

  getTemplateBtn() {
    const btn = this.options.btn.map((i) => `<button class="${this.options.btnClass} ${i.class}" type="${i.type}">${i.text}</button>`); // template of button
    return btn;
  }
}

/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
let valid = new CreateForm(".validator-wrapper", { // init class
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
