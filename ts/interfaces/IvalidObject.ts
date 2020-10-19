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

    creditNumberVisa?: RegExp,
    creditNumberMasterCard?: RegExp,
    creditNumberAmExp?: RegExp,
    creditNumberDiscover?: RegExp,

    creditDate?: RegExp,

    creditBackNum?: RegExp,
}
