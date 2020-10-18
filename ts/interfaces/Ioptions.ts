interface IOptionsCustomValid {
  nicknameReg?: RegExp;
  nicknameMinLength?: number;
  nicknameMaxLength?: number;

  fullNameReg?: RegExp;
  fullNameMinLength?: number;
  fullNameMaxLength?: number;

  emailReg?: RegExp;
  emailMinLength?: number;

  passwordReg?: RegExp;

  dateReg?: RegExp;

  telReg?: RegExp;
  telMinLength?: number;
  telMaxLength?: number;

  fileSize?: number;
  fileType?: string;

  creditNumberVisa?: RegExp;
  creditNumberMasterCard?: RegExp;
  creditNumberAmExp?: RegExp;
  creditNumberDiscover?: RegExp;

  creditDate?: RegExp;

  creditBackNum?: RegExp;
}

interface IOptionsCheckSubstr {
  id?: string;
  substr?: string;
}

export interface IOptionsCustomClassesForm {
  formClass: string;
  blockClass: string;
  errorClass: string;
  labelClass: string;
  btnClass: string;
  focusClass: string;
}
export interface IOptions {
  customValid: IOptionsCustomValid;
  errorMessages: boolean;
  customClassesForm: IOptionsCustomClassesForm;
  checkSubstr: IOptionsCheckSubstr[];
  blackList: string[];
}
