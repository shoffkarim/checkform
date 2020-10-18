interface IOptionsCustom {
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

export interface IOptions {
  custom: IOptionsCustom;
  errorMessages: boolean;
  formClass: string;
  blockClass: string;
  errorClass: string;
  labelClass: string;
  btnClass: string;
  checkSubstr: IOptionsCheckSubstr[];
  blackList: string[];
}
