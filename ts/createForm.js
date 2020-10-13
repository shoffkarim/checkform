"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.CreateForm = void 0;
var form_1 = require("./form");
var CreateForm = /** @class */ (function (_super) {
    __extends(CreateForm, _super);
    function CreateForm(el, options) {
        var _this = _super.call(this, el, options) || this;
        _this.classesForm = {
            formClass: "checkform-form",
            blockClass: "block",
            errorClass: "block__error",
            labelClass: "block__label",
            btnClass: "checkform-btn",
            focusClass: "js-input-focus",
            maskClass: "shell"
        };
        _this.renderTemplate();
        return _this;
    }
    CreateForm.prototype.renderTemplate = function () {
        var renderForm = this.options.renderForm;
        if (renderForm) {
            this.el.innerHTML = this.getTemplate();
        }
    };
    CreateForm.prototype.getTemplate = function () {
        return "<form class=\"" + this.options.formClass + "\" method=\"POST\">\n              " + this.getTemplateInput().join('') + "\n              " + this.getTemplateText().join('') + "\n              " + this.getTemplateBtn().join('') + "\n            </form>";
    };
    CreateForm.prototype.getTemplateInput = function () {
        var _this = this;
        var input = this.options.inputs.map(function (i) {
            if (_this.options.errorMessages) {
                return "<div class=\"" + _this.classesForm.blockClass + "\">\n                  <div class=\"" + _this.classesForm.errorClass + " error-" + i.id + "\">" + i.error + "</div>\n                  <input class=\"checkform " + i["class"] + " " + i.id + "\" data-type=\"" + i.id + "\" data-valid=\"true\" data-mask=\"" + i.mask + "\" type=\"" + i.type + "\" placeholder=\"" + i.placeholder + "\" id=\"" + i.id + "\"/>\n                  <label class=\"" + _this.classesForm.labelClass + " label-" + i.id + "\" for=\"" + i.id + "\">" + i.label + "</label>\n                  </div>";
            }
            return "<div class=\"" + _this.classesForm.blockClass + "\">\n                <input class=\"checkform " + i["class"] + " " + i.id + "\" data-type=\"" + i.id + "\" data-valid=\"true\" type=\"" + i.type + "\" placeholder=\"" + i.placeholder + "\" id=\"" + i.id + "\"/>\n                <label class=\"" + _this.classesForm.labelClass + " label-" + i.id + "\" for=\"" + i.id + "\">" + i.label + "</label>\n              </div>";
        });
        return input;
    };
    CreateForm.prototype.getTemplateText = function () {
        var _this = this;
        var text = this.options.textarea.map(function (i) {
            if (_this.options.errorMessages) {
                return "<div class=\"" + _this.classesForm.blockClass + "\">\n                  <div class=\"" + _this.classesForm.errorClass + " error-" + i.id + "\">" + i.error + "</div>\n                  <textarea class=\"checkform block__input " + i["class"] + "\" data-valid=\"true\" placeholder=\"" + i.placeholder + "\" id=\"" + i.id + "\"></textarea>\n                  <label class=\"" + _this.classesForm.labelClass + " label-" + i.id + "\" for=\"" + i.id + "\">" + i.label + "</label>\n                </div>";
            }
            return "<div class=\"" + _this.classesForm.blockClass + "\">\n                <textarea class=\"checkform block__input " + i["class"] + "\" data-valid=\"true\" data-type=\"" + i.id + "\" placeholder=\"" + i.placeholder + "\" id=\"" + i.id + "\"></textarea>\n                <label class=\"" + _this.classesForm.labelClass + " label-" + i.id + "\" for=\"" + i.id + "\">" + i.label + "</label>\n              </div>";
        });
        return text;
    };
    CreateForm.prototype.getTemplateBtn = function () {
        var _this = this;
        var btn = this.options.btn.map(function (i) { return "<button class=\"" + _this.classesForm.btnClass + " " + i["class"] + "\" type=\"" + i.type + "\">" + i.text + "</button>"; }); // template of button
        return btn;
    };
    return CreateForm;
}(form_1.Form));
exports.CreateForm = CreateForm;
