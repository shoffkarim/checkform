import "./createform";

// eslint-disable-next-line no-unused-vars
export default class CheckForm extends CreateForm {
  constructor(el, options) {
    super();
    this.el = document.querySelector(el);
    this.options = options;
    this.render();
    this.setup();

    this.validObj = { // object parameters of validation
      nickname: {
        reg: /^[a-zA-Z]/,
        minLength: 1,
        maxLength: 15
      },
      fullName: {
        reg: /^[а-яА-ЯёЁ]/,
        minLength: 1,
        maxLength: 15
      },
      email: {
        reg: /^(?!.*@.*@.*$)(?!.*@.*--.*..*$)(?!.*@.*-..*$)(?!.*@.*-$)(.*@.+(..{1,11})?)$/,
        minLength: 1,
      },
      password: {
        reg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/, // min 6 chars
      },
      date: {
        reg: /^\d{4}[./-]\d{2}[./-]\d{2}$/, // first type gggg-mm-dd and sec type dd-mm-gggg /^\d{2}[./-]\d{2}[./-]\d{4}$/
      },
      tel: {
        // eslint-disable-next-line no-useless-escape
        reg: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/, // russian tel and american tel /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/,
        minLength: 1,
        maxLength: 20
      },
      file: {
        size: 10025711, // 10mb
        type: "image",
      },
    };
  }

  render() { // require full form
    const { custom } = this.options;
    const { renderForm } = this.options;
    this.customObject(custom);
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

  focusBlurHandler(event) { // handler events
    console.log(this);
    const input = event.target;
    switch (event.type) {
      case "focus":
        if (input.id === "date") input.type = "date";
        input.classList.add("js-input-focus");
        break;
      case "blur":
        if (input.value !== "") {
          input.classList.add("js-input-focus");
        } else {
          if (input.id === "date") {
            input.type = "text";
          }
          input.classList.remove("js-input-focus");
        }
        break;
      default:
        break;
    }
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

  customObject(custom) { // customization validObj
    for (let i = 0; i < custom.length; i++) { // cycle on custom mas
      for (const j in custom[i]) { // cycle on custom mas obj's
        if (custom[i].hasOwnProperty(j)) { // j - name of type input, custom[i] - object witn custom fields
          for (const k in custom[i][j]) { // cycle on obj's fields
            if (custom[i][j].hasOwnProperty(k)) { // k - name of custom key, custom[i][j] - custom object, custom[i][j][k] - custom value
              this.cycleObj(j, k, custom[i][j][k]);
            }
          }
        }
      }
    }
  };

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
          let nicknameReg = new RegExp(this.validObj.nickname.reg);
          this.regCheck(val, block, nicknameReg, this.validObj.nickname.minLength, this.validObj.nickname.maxLength);
          break;
        }
        case "fullname": {
          let nameReg = new RegExp(this.validObj.fullName.reg);
          this.regCheck(val, block, nameReg, this.validObj.fullName.minLength, this.validObj.fullName.maxLength);
          break;
        }
        case "email": {
          let emailReg = new RegExp(this.validObj.email.reg);
          this.regCheck(val, block, emailReg, this.validObj.email.minLength, this.validObj.email.maxLength);
          break;
        }
        case "password": {
          let passwordReg = new RegExp(this.validObj.password.reg);
          this.regCheck(val, block, passwordReg);
          break;
        }
        case "date": {
          let dateReg = new RegExp(this.validObj.date.reg);
          this.regCheck(val, block, dateReg);
          break;
        }
        case "tel": {
          let telReg = new RegExp(this.validObj.tel.reg);
          this.regCheck(val, block, telReg, this.validObj.tel.minLength, this.validObj.tel.maxLength);
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
          } else if (!file.type.startsWith(this.validObj.file.type)) { // check for type of file
            this.showErrorMessage(block);
            if (!(file.size < this.validObj.file.size)) { // check size file
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
