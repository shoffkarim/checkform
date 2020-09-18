// eslint-disable-next-line max-classes-per-file
class CreateForm {
  constructor(el, options) {
    this.el = document.querySelector(el);
    this.options = options;
    // this.render();
  }
  // render() {
  //   const { renderForm } = this.options;
  //   if (renderForm) { // if user use render form
  //     this.el.innerHTML = this.getTemplate(this.options);
  //   }
  // }

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

// eslint-disable-next-line no-unused-vars
class CheckForm extends CreateForm {
  constructor(el, options) {
    super(el, options);
    this.validObj = { // object parameters of validation
      nicknameReg: /^[a-zA-Z]/,
      nicknameRegMinLength: 1,
      nicknameRegMaxLength: 15,

      fullNameReg: /^[а-яА-ЯёЁ]/,
      fullNameMinLength: 1,
      fullNameMaxLength: 15,

      emailReg: /^(?!.*@.*@.*$)(?!.*@.*--.*..*$)(?!.*@.*-..*$)(?!.*@.*-$)(.*@.+(..{1,11})?)$/,
      emailMinLength: 1,

      passwordReg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/, // min 6 chars

      dateReg: /^\d{4}[./-]\d{2}[./-]\d{2}$/, // first type gggg-mm-dd and sec type dd-mm-gggg /^\d{2}[./-]\d{2}[./-]\d{4}$/

      // eslint-disable-next-line no-useless-escape
      telReg: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/, // russian tel and american tel /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/,
      telMinLength: 1,
      telMaxLength: 20,

      fileSize: 10025711, // 10mb
      fileType: "image",
    };
    this.render();
    this.setup();
  }

  render() { // require full form
    const { renderForm } = this.options;
    this.customObject();
    if (renderForm) { // if user use render form
      this.el.innerHTML = this.getTemplate(this.options);
    }
  }

  setup() { // req clickhandler
    this.focusBlurHandler = this.focusBlurHandler.bind(this);
    const inputsList = document.querySelectorAll(".validator");
    inputsList.forEach((i) => {
      i.addEventListener('focus', this.focusBlurHandler);
      i.addEventListener('blur', this.focusBlurHandler);
    });
    const btn = document.querySelector(`.${this.options.btnClass}`);
    this.clickHandler = this.clickHandler.bind(this);
    btn.addEventListener('click', this.clickHandler);
  }

  cycleObj(name, key, value) {
    for (const z in this.validObj) { // cycle on validobj
      if (this.validObj.hasOwnProperty(z)) { // z - name of field, this.validObj[z] - field
        for (const y in this.validObj[z]) {
          if (this.validObj[z].hasOwnProperty(y)) {
            if (z === name) {
if (y === key) { this.validObj[z][y] = value; }
}
          }
        }
      }
    }
  }

  customObject() { // customization validObj
    console.log(this.options.custom);
    // for (let i = 0; i < custom.length; i++) { // cycle on custom mas
    //   for (const j in custom[i]) { // cycle on custom mas obj's
    //     if (custom[i].hasOwnProperty(j)) { // j - name of type input, custom[i] - object witn custom fields
    //       for (const k in custom[i][j]) { // cycle on obj's fields
    //         if (custom[i][j].hasOwnProperty(k)) { // k - name of custom key, custom[i][j] - custom object, custom[i][j][k] - custom value
    //           this.cycleObj(j, k, custom[i][j][k]);
    //         }
    //       }
    //     }
    //   }
    // }
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

  clickHandler(event) { // validation when click submit
    event.preventDefault();
    const inputsList = document.querySelectorAll("[data-valid=true]");
    inputsList.forEach((block) => {
      let val = block.value;
      switch (block.getAttribute("data-type")) { // all inputs should have id
        case "nickname": {
          let nicknameReg = new RegExp(this.validObj.nicknameReg);
          this.regCheck(val, block, nicknameReg, this.validObj.nicknameMinLength, this.validObj.nicknameMaxLength);
          break;
        }
        case "fullname": {
          let nameReg = new RegExp(this.validObj.fullNameReg);
          this.regCheck(val, block, nameReg, this.validObj.fullNameMinLength, this.validObj.fullNameMaxLength);
          break;
        }
        case "email": {
          let emailReg = new RegExp(this.validObj.emailReg);
          this.regCheck(val, block, emailReg, this.validObj.emailMinLength, this.validObj.emailMaxLength);
          break;
        }
        case "password": {
          let passwordReg = new RegExp(this.validObj.passwordReg);
          this.regCheck(val, block, passwordReg);
          break;
        }
        case "date": {
          let dateReg = new RegExp(this.validObj.dateReg);
          this.regCheck(val, block, dateReg);
          break;
        }
        case "tel": {
          let telReg = new RegExp(this.validObj.telReg);
          this.regCheck(val, block, telReg, this.validObj.telMinLength, this.validObj.telMaxLength);
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
        default: {
          break;
        }
      }
    });
  }

  validOk(funcName) {
    document.querySelector('.validator-btn').addEventListener('click', function () {
      const inputsList = document.querySelectorAll("[data-valid=true]");
      const goodInputs = document.querySelectorAll(".good");
      if (inputsList.length === goodInputs.length) {
        funcName();
      } else return false;
    });
  }
}

// eslint-disable-next-line no-unused-vars
let valid = new CheckForm(".validator-wrapper", { // init class
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
  focusClass: "js-input-focus",
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