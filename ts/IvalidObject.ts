export interface IValidObj {
    nicknameReg: any,
    nicknameMinLength: number,
    nicknameMaxLength: number,

    fullNameReg: any,
    fullNameMinLength: number,
    fullNameMaxLength: number,

    emailReg: any,
    emailMinLength: number,

    passwordReg: any,

    dateReg: any,

    telReg: any,
    telMinLength: number,
    telMaxLength: number,

    fileSize: number,
    fileType: string,

    creditNumberVisa: any,
    creditNumberMasterCard: any,
    creditNumberAmExp: any,
    creditNumberDiscover: any,

    creditData: any,

    creditBackNum:any,
}