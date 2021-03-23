interface IClassesForm {
  wrapperClass?: string,
  formClass?: string,
  blockClass?: string,
  errorClass?: string,
  labelClass?: string,
  btnClass?: string,
  focusClass?: string,
  blockErrorClass?: string,
  blockGoodClass?: string,
  maskClass?: string,
}
interface IValidObj {
  nicknameReg?: RegExp,
  nicknameMinLength?: number,
  nicknameMaxLength?: number,

  fullNameReg?: RegExp,
  fullNameMinLength?: number,
  fullNameMaxLength?: number,

  emailReg?: RegExp,
  emailMinLength?: number,

  passwordReg?: RegExp,

  dateReg?: RegExp,

  telReg?: RegExp,
  telMinLength?: number,
  telMaxLength?: number,

  fileSize?: number,
  fileType?: string,

  bankNumber?: RegExp,
  bankDate?: RegExp,
  bankBackNum?: RegExp,
}
interface IOptionsCheckSubstr {
  id?: string;
  substr?: string;
}
interface IOptions {
  customValid?: IValidObj;
  errorMessages?: boolean;
  customClassesForm?: IClassesForm;
  checkSubstr?: IOptionsCheckSubstr[];
  blackList?: string[];
}
class Form {
  public options: IOptions;

  public classesForm: IClassesForm = {
    wrapperClass: "checkform-wrapper",
    formClass: "checkform-form",
    blockClass: "block",
    errorClass: "block__error",
    labelClass: "block__label",
    btnClass: "checkform-btn",
    focusClass: "js-input-focus",
    blockErrorClass: "error",
    blockGoodClass: "good",
    maskClass: "mask"
  };

  public validObj: IValidObj = {
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
    telReg: /^(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/, // russian tel and american tel /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/,
    telMinLength: 1,
    telMaxLength: 20,

    fileSize: 10025711, // 10mb
    fileType: "image",

    bankNumber: /(?<=^|[^0-9])[0-9]{16}(?=[^0-9]|$)|[0-9]{4}[-| |_][0-9]{4}[-| |_][0-9]{4}[-| |_][0-9]{4}/, // bank card numbers

    bankDate: /^\d{2}[.]\d{2}$/,

    bankBackNum: /^\d{3}/,
  };

  constructor(options: IOptions) {
    this.options = options;
    this.wrapperClasses();
  }

  /**
   * wrapperClasss
   */
  public wrapperClasses() : void {
    let wrapper: HTMLElement = document.querySelector(`.${this.classesForm.wrapperClass}`);
    if (this.options.errorMessages === true) {
      wrapper.classList.add("error-show");
    } else {
      wrapper.classList.remove("error-show");
    }
  }

  /**
   * show error message
   */
  public showError(block: HTMLElement) : void {
    let parent: HTMLElement = block.parentElement;
    if (parent.classList.contains("mask")) {
      parent = parent.parentElement;
    }
    parent.classList.remove(`${this.classesForm.blockGoodClass}`);
    parent.classList.add(`${this.classesForm.blockErrorClass}`);
  }

  /**
   * hide error message
   */
  public hideError(block: HTMLElement) : void {
    let parent: HTMLElement = block.parentElement;
    if (parent.classList.contains("mask")) {
      parent = parent.parentElement;
    }
    parent.classList.remove(`${this.classesForm.blockErrorClass}`);
    parent.classList.add(`${this.classesForm.blockGoodClass}`);
  }
}
class MaskForm extends Form {
  public maskInputs: NodeListOf<HTMLElement>;

  public maskedNumber: string;

  public maskedLetter: string;

  public classesForm: IClassesForm;

  constructor(options: IOptions) {
    super(options);
    this.maskInputs = document.querySelectorAll(".checkform__mask");
    this.maskedNumber = "XdDmMyY9";
    this.setupMask();
    this.activateMask();
  }

  /**
   * setupMask
   */
  public setupMask() : void {
    for (let i = 0; i < this.maskInputs.length; i++) {
      this.createMask(this.maskInputs[i]);
    }
  }

  /**
   * createMask
   */
  public createMask(input: HTMLElement) : void {
    let placeholder: string = input.getAttribute("placeholder");
    input.setAttribute("maxlength", `${placeholder.length}`);
    input.setAttribute("data-placeholder", placeholder);
    input.removeAttribute("placeholder");

    let maskElement = `<span class="${this.classesForm.maskClass}">
      <span aria-hidden="true" id="${input.id}Mask"><i></i>${placeholder}</span>${input.outerHTML}</span>`
    input.outerHTML = maskElement;
  }

  /**
   * activateMask
   */
  public activateMask() : void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.handleValueChange = this.handleValueChange.bind(this);
    this.maskInputs = document.querySelectorAll(".mask .checkform__mask");
    for (let i = 0; i < this.maskInputs.length; i++) {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.maskInputs[i].addEventListener("keyup", this.handleValueChange)
    }
  }

  /**
   * handleValueChange
   */
  public handleValueChange(event: KeyboardEvent) : void {
    let input = <HTMLInputElement>event.srcElement;
    let id = input.id;

    switch (event.keyCode) { // exclusion of special keys
      case 20:
      case 17:
      case 18:
      case 16:
      case 37:
      case 38:
      case 39:
      case 40:
      case 9:
        return;
      default:
        break;
    }

    input.value = `${this.handleCurrentValue(event)}`;
    document.getElementById(`${id}Mask`).innerHTML = this.setValueMask(event);
  }

  /**
   * handleCurrentValue
   */
  public handleCurrentValue(event: KeyboardEvent) : string {
    let input = <HTMLInputElement>event.target;
    let placeholder: string = input.getAttribute("data-placeholder");
    let value: string = input.value;
    let placeholderLength: number = placeholder.length
    let newValue = "";
    let strippedValue: string = value.replace(/\D/g, "");

    for (let i = 0, j = 0; i < placeholderLength; i++) {
        // eslint-disable-next-line no-restricted-globals
        let isInt = !isNaN(parseInt(strippedValue[j], 10));
        let matchesNumber: boolean = this.maskedNumber.indexOf(placeholder[i]) >= 0;

        if (matchesNumber && isInt) {
          newValue += strippedValue[j++];
        } else if (matchesNumber && !isInt) {
          return newValue;
        } else {
          newValue += placeholder[i];
        }
    }
    return newValue;
  }

  /**
   * setValueMask
   */
  // eslint-disable-next-line class-methods-use-this
  public setValueMask(event: KeyboardEvent) : string {
    let input = <HTMLInputElement>event.target;
    let value: string = input.value;
    let placeholder: string = input.getAttribute("data-placeholder");
    return `<i>+7${value}</i>${placeholder.substr(value.length)}`;
  }
}
class CustomParam extends MaskForm {
  validObj: IValidObj;

  /**
   * customValid
   */
  public customValid(): void {
    if (this.options.customValid) {
      this.validObj = Object.assign(this.validObj, this.options.customValid);
    }
  }

  /**
   * customClassesForm
   */
  public customClassesForm() : void{
    if (this.options.customClassesForm) {
      this.classesForm = Object.assign(this.classesForm, this.options.customClassesForm);
    }
  }
}
class CheckForm extends CustomParam {
  validObj: IValidObj;

  classesForm: IClassesForm;

  constructor(options: IOptions) {
    super(options);
    this.customClassesForm();
    this.customValid();
    this.setup();
  }

  private setup() : void {
    const btn: HTMLElement = document.querySelector(`.${this.classesForm.btnClass}`);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.validation = this.validation.bind(this);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    btn.addEventListener("click", this.validation);
  }

  public regCheck(val: string, block: HTMLElement, reg: RegExp, minLength = 0, maxLength = 1000) : void { // function for check regexp
    if (val.length < minLength || val.length > maxLength) {
      this.showError(block);
    } else if (!reg.test(val)) {
        this.showError(block);
    } else {
        this.hideError(block);
        this.checkSubstring(block, val);
        this.checkBlackList(block, val);
    }
  }

  public checkSubstring(block: HTMLElement, val: string) : void { // check string for include substr
    for (let i = 0; i < this.options.checkSubstr.length; i++) {
      if (this.options.checkSubstr[i].id === block.getAttribute("id")) {
        if (val.includes(this.options.checkSubstr[i].substr)) {
          this.hideError(block);
        } else {
          this.showError(block);
        }
      }
    }
  }

  public checkBlackList(block: HTMLElement, val: string) : void { // check string for include substr from blacklist
    for (let i = 0; i < this.options.blackList.length; i++) {
      if (val.includes(this.options.blackList[i])) {
        this.showError(block);
      }
    }
  }

  protected validation(event: Event) : void{ // validation when click submit
    event.preventDefault();
    const inputsList = document.querySelectorAll("[data-valid=true]");
    inputsList.forEach((block: HTMLInputElement) => {
      let val: string = block.value;
      switch (block.id) { // all inputs should have id
        case "nickname": {
          let reg = new RegExp(this.validObj.nicknameReg);
          let minLength: number = this.validObj.nicknameMinLength;
          let maxLength: number = this.validObj.nicknameMaxLength;
          this.regCheck(val, block, reg, minLength, maxLength);
          break;
        }
        case "fullname": {
          let reg = new RegExp(this.validObj.fullNameReg);
          let minLength: number = this.validObj.fullNameMinLength;
          let maxLength: number = this.validObj.fullNameMaxLength;
          this.regCheck(val, block, reg, minLength, maxLength);
          break;
        }
        case "email": {
          let reg = new RegExp(this.validObj.emailReg);
          let minLength: number = this.validObj.emailMinLength;
          this.regCheck(val, block, reg, minLength);
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
          let minLength: number = this.validObj.telMinLength;
          let maxLength: number = this.validObj.telMaxLength;
          this.regCheck(val, block, reg, minLength, maxLength);
          break;
        }
        case "checkbox": {
          let checked: boolean = block.checked;
          if (!checked) {
            this.showError(block);
          } else {
            this.hideError(block);
          }
          break;
        }
        case "file": {
          let file: File = block.files[0]; // check for empty
          if (val === "") {
            this.showError(block);
          } else if (!file.type.startsWith(this.validObj.fileType)) { // check for type of file
            this.showError(block);
            if (!(file.size < this.validObj.fileSize)) { // check size file
              this.showError(block);
            }
          } else {
            this.hideError(block);
          }
          break;
        }
        case "textarea": {
          if (val === "") {
            this.showError(block);
          } else {
            this.hideError(block);
            this.checkSubstring(block, val);
          }
          break;
        }
        case "bankCardNumber": {
          let reg = new RegExp(this.validObj.bankNumber);
          let maxLength = 19;
          let minLength = 12;
          this.regCheck(val, block, reg, minLength, maxLength);
          break;
        }
        case "bankDate": {
          let reg = new RegExp(this.validObj.bankDate);
          let minLength = 4;
          this.regCheck(val, block, reg, minLength);
          break;
        }
        case "bankBackNum": {
          let reg = new RegExp(this.validObj.bankBackNum);
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
}
