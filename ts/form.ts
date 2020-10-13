export class Form {
  public el: any;
  public options: any;
  public validObj: object = {
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
  constructor(el: any, options: any) {
    this.el = document.querySelector(el);
    this.options = options;
  }
}
