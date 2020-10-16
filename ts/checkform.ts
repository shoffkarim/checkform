import {Form} from './form'
export class CheckForm extends Form{

  constructor(el: any, options: any) {
    super(el, options);
    this.setup();
  }

  private setup() {
    const btn: any = document.querySelector(`.${this.classesForm.btnClass}`);
    this.validation = this.validation.bind(this);
    btn.addEventListener('click', this.validation);
  }

  private showErrorMessage(block: any) {
    let parent: any = block.parentElement;
    if (this.options.errorClass) {
      if (parent.querySelector(`.${this.options.errorClass}`)) {
        let errorBlock: any = parent.querySelector(`.${this.options.errorClass}`);
        errorBlock.style.opacity = '1';
        block.classList.add("error");
        block.classList.remove("good");
      } else {
        block.classList.add("error");
        block.classList.remove("good");
      }
    } else if (parent.querySelector('.block__error')) {
        let errorBlock: any = parent.querySelector('.block__error');
        errorBlock.style.opacity = '1';
        block.classList.add("error");
        block.classList.remove("good");
      } else {
        block.classList.add("error");
        block.classList.remove("good");
      }
  }

  private hideErrorMessage(block: any) {
    let parent: any = block.parentElement;
    if (this.options.errorClass) {
      if (parent.querySelector(`.${this.options.errorClass}`)) {
        let errorBlock: any = parent.querySelector(`.${this.options.errorClass}`);
        errorBlock.style.opacity = '0';
        block.classList.remove("error");
        block.classList.add("good");
      } else {
        block.classList.remove("error");
        block.classList.add("good");
      }
    } else if (parent.querySelector('.block__error')) {
        let errorBlock: any = parent.querySelector('.block__error');
        errorBlock.style.opacity = '0';
        block.classList.remove("error");
        block.classList.add("good");
      } else {
        block.classList.remove("error");
        block.classList.add("good");
      }
  }
  public regCheck(val: any, block: any, reg: any, minLength: number = 0, maxLength: number = 1000) { // function for check regexp
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

  public checkSubstring(block: any, val: any) { // check string for include substr
    for (let i: number = 0; i < this.options.checkSubstr.length; i++) {
      if (this.options.checkSubstr[i].id === block.getAttribute("id")) {
        if (val.includes(this.options.checkSubstr[i].substr)) {
          this.hideErrorMessage(block);
        } else {
          this.showErrorMessage(block);
        }
      }
    }
  }

  public checkBlackList(block: any, val: any) { // check string for include substr from blacklist
    for (let i: number = 0; i < this.options.blackList.length; i++) {
      if (val.includes(this.options.blackList[i])) {
        this.showErrorMessage(block);
      }
    }
  }

  private validation(event: any) { // validation when click submit
    event.preventDefault();
    const inputsList = document.querySelectorAll("[data-valid=true]");
    inputsList.forEach((block: any) => {
      let val: string = block.value;
      switch (block.getAttribute("data-type")) { // all inputs should have id
        case "nickname": {
          let reg: any = new RegExp(this.validObj.nicknameReg);
          let minLength: number = this.validObj.nicknameMinLength;
          let maxLength: number = this.validObj.nicknameMaxLength;
          this.regCheck(val, block, reg, minLength, maxLength);
          break;
        }
        case "fullname": {
          let reg: any = new RegExp(this.validObj.fullNameReg);
          let minLength: number = this.validObj.fullNameMinLength;
          let maxLength: number = this.validObj.fullNameMaxLength;
          this.regCheck(val, block, reg, minLength, maxLength);
          break;
        }
        case "email": {
          let reg: any = new RegExp(this.validObj.emailReg);
          let minLength: number = this.validObj.emailMinLength;
          this.regCheck(val, block, reg, minLength);
          break;
        }
        case "password": {
          let reg: any = new RegExp(this.validObj.passwordReg);
          this.regCheck(val, block, reg);
          break;
        }
        case "date": {
          let reg: any = new RegExp(this.validObj.dateReg);
          this.regCheck(val, block, reg);
          break;
        }
        case "tel": {
          let reg: any = new RegExp(this.validObj.telReg);
          let minLength: number = this.validObj.telMinLength;
          let maxLength: number = this.validObj.telMaxLength;
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
          let file: any = block.files[0]; // check for empty
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
        case "creditDate": {
          let reg: any = new RegExp(this.validObj.creditDate);
          let minLength: number = 4;
          this.regCheck(val, block, reg, minLength);
          break;
        }
        case "creditBackNum": {
          let reg: any = new RegExp(this.validObj.creditBackNum);
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
