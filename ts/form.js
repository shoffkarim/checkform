"use strict";
exports.__esModule = true;
exports.Form = void 0;
var Form = /** @class */ (function () {
    function Form(el, options) {
        this.validObj = {
            nicknameReg: /^[a-zA-Z]/,
            nicknameMinLength: 1,
            nicknameMaxLength: 15,
            fullNameReg: /^[a-zA-Z]/,
            fullNameMinLength: 1,
            fullNameMaxLength: 15,
            emailReg: /^[a-zA-Z]/,
            emailMinLength: 1,
            passwordReg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
            dateReg: /^\d{4}[./-]\d{2}[./-]\d{2}$/,
            // eslint-disable-next-line no-useless-escape
            telReg: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
            telMinLength: 1,
            telMaxLength: 20,
            fileSize: 10025711,
            fileType: "image",
            creditNumberVisa: /^(?:4[0-9]{12}(?:[0-9]{3})?)$/,
            creditNumberMasterCard: /^(?:5[1-5][0-9]{14})$/,
            creditNumberAmExp: /^(?:3[47][0-9]{13})$/,
            creditNumberDiscover: /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/,
            creditData: /^\d{2}[.]\d{2}$/,
            creditBackNum: /^\d{3}/
        };
        this.el = document.querySelector(el);
        this.options = options;
    }
    return Form;
}());
exports.Form = Form;
