/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import IOptions from "./interfaces/Ioptions";
import IValidObj from "./interfaces/IvalidObject";
import CustomValidObj from "./customValidObj";
import IClassesForm from "./interfaces/IclassesForm";

export default class CheckForm extends CustomValidObj {
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
          let maxLength: number = 19;
          let minLength: number = 12;
          this.regCheck(val, block, reg, minLength, maxLength);
          break;
        }
        case "bankDate": {
          let reg = new RegExp(this.validObj.bankDate);
          let minLength: number = 4;
          this.regCheck(val, block, reg, minLength);
          break;
        }
        case "bankBackNum": {
          let reg = new RegExp(this.validObj.bankBackNum);
          let minLength: number = 3;
          let maxLength: number = 3;
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
