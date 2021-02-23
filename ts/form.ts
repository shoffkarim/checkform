/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import IValidObj from "./interfaces/IvalidObject";
import IOptions from "./interfaces/Ioptions";
import IClassesForm from "./interfaces/IclassesForm";

export default class Form {
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
