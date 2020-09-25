// eslint-disable-next-line max-classes-per-file
class CreateForm {
  constructor(el, options) {
    this.el = document.querySelector(el);
    this.options = options;
    this.renderTemplate();
  }

  renderTemplate() { // require full form
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
                  <input class="checkform ${i.class} ${i.id}" data-type="${i.id}" data-valid="true" data-mask="${i.mask}" type="${i.type}" placeholder="${i.placeholder}" id="${i.id}"/>
                  <label class="${this.options.labelClass} label-${i.id}" for="${i.id}">${i.label}</label>
                  </div>`;
      }
      return `<div class="${this.options.blockClass}">
                <input class="checkform ${i.class} ${i.id}" data-type="${i.id}" data-valid="true" type="${i.type}" placeholder="${i.placeholder}" id="${i.id}"/>
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
                  <textarea class="checkform block__input ${i.class}" data-valid="true" placeholder="${i.placeholder}" id="${i.id}"></textarea>
                  <label class="${this.options.labelClass} label-${i.id}" for="${i.id}">${i.label}</label>
                </div>`;
        }
      return `<div class="${this.options.blockClass}">
                <textarea class="checkform block__input ${i.class}" data-valid="true" data-type="${i.id}" placeholder="${i.placeholder}" id="${i.id}"></textarea>
                <label class="${this.options.labelClass} label-${i.id}" for="${i.id}">${i.label}</label>
              </div>`;
    });
    return text;
  }

  getTemplateBtn() {
    const btn = this.options.btn.map((i) => `<button class="${this.options.btnClass} ${i.class}" type="${i.type}">${i.text}</button>`); // template of button
    return btn;
  }

  // TODO: new animation
  focusBlurHandler(event) { // handler events
    let focusClass = "js-input-focus";
    if (this.options.focusClass) {
      focusClass = this.options.focusClass;
    }
    const input = event.target;
    switch (event.type) {
      case "focus": {
        if (input.id === "date") input.type = "date";
        input.classList.add(focusClass);
        break;
      }
      case "blur": {
        if (input.value !== "") {
          input.classList.add(focusClass);
        } else {
          if (input.id === "date") {
            input.type = "text";
          }
          input.classList.remove(focusClass);
        }
        break;
      }
      default: {
        break;
      }
    }
  }
}

class Mask extends CreateForm {
  constructor(el, options) {
    super(el, options);
    this.maskedInputs = document.querySelectorAll("[data-mask=true]");
    this.setupMask(this.maskedInputs);
  }

  setupMask(inputs) {
    for (let i = 0; i < inputs.length; i++) {
      this.createShell(inputs[i]);
    }
  }

  createShell(input) {
    let placeholder = input.getAttribute('placeholder');
    input.setAttribute('maxlength', placeholder.length);
    input.setAttribute('data-placeholder', placeholder);
    console.log(1);
    let text = `<span class="${this.options.maskClass}">
      <span class="checkformMask" aria-hidden="true" id="${input.id}Mask">
        <i></i>
        ${placeholder}
      </span>
      ${input.outerHTML}
    </span>`;
    input.outerHTML = text;
  }
}

// eslint-disable-next-line no-unused-vars
class CheckForm extends Mask {
  constructor(el, options) {
    super(el, options);
    this.validObj = { // object parameters of validation
      nicknameReg: /^[a-zA-Z]/,
      nicknameMinLength: 1,
      nicknameMaxLength: 15,

      fullNameReg: /^[a-zA-Z]/, // /^[а-яА-ЯёЁ]/,
      fullNameMinLength: 1,
      fullNameMaxLength: 15,

      emailReg: /^[a-zA-Z]/, // /^(?!.*@.*@.*$)(?!.*@.*--.*..*$)(?!.*@.*-..*$)(?!.*@.*-$)(.*@.+(..{1,11})?)$/,
      emailMinLength: 1,

      passwordReg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/, // min 6 chars

      dateReg: /^\d{4}[./-]\d{2}[./-]\d{2}$/, // first type gggg-mm-dd and sec type dd-mm-gggg /^\d{2}[./-]\d{2}[./-]\d{4}$/

      // eslint-disable-next-line no-useless-escape
      telReg: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/, // russian tel and american tel /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/,
      telMinLength: 1,
      telMaxLength: 20,

      fileSize: 10025711, // 10mb
      fileType: "image",

      creditNumberVisa: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/, // credit card numbers
      creditNumberMasterCard: /^(?:5[1-5][0-9]{14})$/,
      creditNumberAmExp: /^(?:3[47][0-9]{13})$/,
      creditNumberDiscover: /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/,

      creditData: /^\d{2}[.]\d{2}$/,

      creditBackNum: /^\d{3}/,
    };
    this.render();
    this.setup();
  }

  render() { // require full form
    const { custom } = this.options;
    if (custom) {
      this.customObject();
    }
  }

  setup() { // req clickhandler
    // this.focusBlurHandler = this.focusBlurHandler.bind(this);
    // const inputsList = document.querySelectorAll(".checkform");
    // inputsList.forEach((i) => {
    //   i.addEventListener('focus', this.focusBlurHandler);
    //   i.addEventListener('blur', this.focusBlurHandler);
    // });
    const btn = document.querySelector(`.${this.options.btnClass}`);
    this.validation = this.validation.bind(this);
    btn.addEventListener('click', this.validation);
  }

  customObject() { // customization validObj
    // eslint-disable-next-line no-restricted-syntax
    for (const key in this.options.custom) {
      if (this.options.custom.hasOwnProperty.call(this.options.custom, key)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const validObjKey in this.validObj) {
          if (this.validObj.hasOwnProperty.call(this.validObj, validObjKey)) {
            if (validObjKey === key) {
              this.validObj[validObjKey] = this.options.custom[key];
            }
          }
        }
      }
    }
  }

  showErrorMessage(block) {
    let parent = block.parentElement;
    if (this.options.errorClass) {
      if (parent.querySelector(`.${this.options.errorClass}`)) {
        let errorBlock = parent.querySelector(`.${this.options.errorClass}`);
        errorBlock.style.opacity = '1';
        block.classList.add("error");
        block.classList.remove("good");
      } else {
        block.classList.add("error");
        block.classList.remove("good");
      }
    } else if (parent.querySelector('.block__error')) {
        let errorBlock = parent.querySelector('.block__error');
        errorBlock.style.opacity = '1';
        block.classList.add("error");
        block.classList.remove("good");
      } else {
        block.classList.add("error");
        block.classList.remove("good");
      }
  }

  hideErrorMessage(block) {
    let parent = block.parentElement;
    if (this.options.errorClass) {
      if (parent.querySelector(`.${this.options.errorClass}`)) {
        let errorBlock = parent.querySelector(`.${this.options.errorClass}`);
        errorBlock.style.opacity = '0';
        block.classList.remove("error");
        block.classList.add("good");
      } else {
        block.classList.remove("error");
        block.classList.add("good");
      }
    } else if (parent.querySelector('.block__error')) {
        let errorBlock = parent.querySelector('.block__error');
        errorBlock.style.opacity = '0';
        block.classList.remove("error");
        block.classList.add("good");
      } else {
        block.classList.remove("error");
        block.classList.add("good");
      }
  }

  regCheck(val, block, reg, minLength = 0, maxLength = 1000) { // function for check regexp
    if (val.length < minLength || val.length > maxLength) {
      this.showErrorMessage(block);
    } else if (!reg.test(val)) {
        this.showErrorMessage(block);
      } else {
        this.hideErrorMessage(block);
        this.checkSubstring(block, val);
        this.checkBlackList(block, val);
      }
  }

  checkSubstring(block, val) { // check string for include substr
    for (let i = 0; i < this.options.checkSubstr.length; i++) {
      if (this.options.checkSubstr[i].id === block.getAttribute("id")) {
        if (val.includes(this.options.checkSubstr[i].substr)) {
          this.hideErrorMessage(block);
        } else {
          this.showErrorMessage(block);
        }
      }
    }
  }

  checkBlackList(block, val) { // check string for include substr from blacklist
    for (let i = 0; i < this.options.blackList.length; i++) {
      if (val.includes(this.options.blackList[i])) {
        this.showErrorMessage(block);
      }
    }
  }

  validation(event) { // validation when click submit
    event.preventDefault();
    const inputsList = document.querySelectorAll("[data-valid=true]");
    inputsList.forEach((block) => {
      let val = block.value;
      switch (block.getAttribute("data-type")) { // all inputs should have id
        case "nickname": {
          let reg = new RegExp(this.validObj.nicknameReg);
          let minLength = this.validObj.nicknameMinLength;
          let maxLength = this.validObj.nicknameMaxLength;
          this.regCheck(val, block, reg, minLength, maxLength);
          break;
        }
        case "fullname": {
          let reg = new RegExp(this.validObj.fullNameReg);
          let minLength = this.validObj.fullNameMinLength;
          let maxLength = this.validObj.fullNameMaxLength;
          this.regCheck(val, block, reg, minLength, maxLength);
          break;
        }
        case "email": {
          let reg = new RegExp(this.validObj.emailReg);
          let minLength = this.validObj.emailMinLength;
          let maxLength = this.validObj.emailMaxLength;
          this.regCheck(val, block, reg, minLength, maxLength);
          break;
        }
        case "password": {
          let reg = new RegExp(this.validObj.passwordReg);
          this.regCheck(val, block, reg);
          break;
        }
        case "date": {
          let reg = new RegExp(this.validObj.dateReg);
          this.regCheck(val, block, reg);
          break;
        }
        case "tel": {
          let reg = new RegExp(this.validObj.telReg);
          let minLength = this.validObj.telMinLength;
          let maxLength = this.validObj.telMaxLength;
          this.regCheck(val, block, reg, minLength, maxLength);
          break;
        }
        case "checkbox": {
          if (!block.checked) {
            this.showErrorMessage(block);
          } else {
            this.hideErrorMessage(block);
          }
          break;
        }
        case "file": {
          let file = block.files[0]; // check for empty
          if (val === "") {
            this.showErrorMessage(block);
          } else if (!file.type.startsWith(this.validObj.fileType)) { // check for type of file
            this.showErrorMessage(block);
            if (!(file.size < this.validObj.fileSize)) { // check size file
              this.showErrorMessage(block);
            }
          } else {
            this.hideErrorMessage(block);
          }
          break;
        }
        case "textarea": {
          if (val === "") {
            this.showErrorMessage(block);
          } else {
            this.hideErrorMessage(block);
            this.checkSubstring(block, val);
          }
          break;
        }
        case "creditCardNumber": {
          if (this.validObj.creditNumberAmExp.test(val)) {
            this.hideErrorMessage(block);
          } else if (this.validObj.creditNumberDiscover.test(val)) {
            this.hideErrorMessage(block);
          } else if (this.validObj.creditNumberMasterCard.test(val)) {
            this.hideErrorMessage(block);
          } else if (this.validObj.creditNumberVisa.test(val)) {
            this.hideErrorMessage(block);
          } else {
            this.showErrorMessage(block);
          }
          break;
        }
        case "creditData": {
          let reg = new RegExp(this.validObj.creditData);
          let minLength = 4;
          this.regCheck(val, block, reg, minLength);
          break;
        }
        case "creditBackNum": {
          let reg = new RegExp(this.validObj.creditBackNum);
          let minLength = 3;
          let maxLength = 3;
          this.regCheck(val, block, reg, minLength, maxLength);
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  // validOk(funcName) {
  //   document.querySelector('.validator-btn').addEventListener('click', function () {
  //     const inputsList = document.querySelectorAll("[data-valid=true]");
  //     const goodInputs = document.querySelectorAll(".good");
  //     if (inputsList.length === goodInputs.length) {
  //       funcName();
  //     } else return false;
  //   });
  // }
}

// eslint-disable-next-line no-unused-vars
let valid = new CheckForm(".checkform-wrapper", { // init class
  renderForm: true,
  inputs: [
    {
      id: "email", type: "text", class: "block__input", placeholder: "enter your email", label: "enter your email", error: "incorrect email", mask: false
    },
    {
      id: "fullname", type: "text", class: "block__input", placeholder: "enter your name", label: "enter your name", error: "incorrect name", mask: false
    },
    {
      id: "password", type: "password", class: "block__input", placeholder: "password", label: "password", error: "incorrect password", mask: false
    },
    {
      id: "tel", type: "tel", class: "block__input", placeholder: "+7(xxx)-xxx-xx-xx", label: "number", error: "incorrect number", mask: true
    },
    {
      id: "date", type: "date", class: "block__input", placeholder: "dd.mm.yyyy", label: "date", error: "incorrect date", mask: false
    }, // must indicate type text for date, for good animation
    {
      id: "checkbox", type: "checkbox", class: "block__input", placeholder: "checkbox", label: "checkbox", error: "incorrect check", mask: false
    },
    {
      id: "file", type: "file", class: "block__input", placeholder: "file", label: "file", error: "incorrect file", mask: false
    },
    {
      id: "creditCardNumber", type: "text", class: "block__input", placeholder: "xxxx xxxx xxxx xxxx", label: "credit card number", error: "incorrect card number", mask: true
    },
    {
      id: "creditData", type: "text", class: "block__input", placeholder: "mm/yy", label: "credit data", error: "incorrect card data", mask: true
    },
    {
      id: "creditBackNum", type: "text", class: "block__input", placeholder: "xxx", label: "credit back num", error: "incorrect card back num", mask: true
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
  focusClass: "js-input-focus",
  maskClass: "shell",
  checkSubstr: [
    {
      id: "name", substr: "karim"
    },
    // {
    //   id: "email", substr: "k4r1"
    // }
  ],
  blackList: ["lol", "kek"]
});

//console.log(valid.validObj);
