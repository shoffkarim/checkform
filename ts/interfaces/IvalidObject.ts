export default interface IValidObj {
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

    bankNumberVisa?: RegExp,
    bankNumberMasterCard?: RegExp,
    bankNumberAmExp?: RegExp,
    bankNumberDiscover?: RegExp,

    bankDate?: RegExp,

    bankBackNum?: RegExp,
}
