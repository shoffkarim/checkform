import {Form} from './form'
interface IclassesForm {
  formClass: string,
  blockClass : string,
  errorClass: string,
  labelClass: string,
  btnClass: string,
  focusClass: string,
  maskClass: string,
}
export class CreateForm extends Form {

  public classesForm: IclassesForm = {
    formClass: "checkform-form",
    blockClass: "block",
    errorClass: "block__error",
    labelClass: "block__label",
    btnClass: "checkform-btn",
    focusClass: "js-input-focus",
    maskClass: "shell",
  };

  constructor(el, options) {
    super(el, options);
    this.renderTemplate();
  }

  private renderTemplate() {
    const renderForm: boolean = this.options.renderForm;
    if (renderForm) {
      this.el.innerHTML = this.getTemplate();
    }
  }

  private getTemplate() {
    return `<form class="${this.options.formClass}" method="POST">
              ${this.getTemplateInput().join('')}
              ${this.getTemplateText().join('')}
              ${this.getTemplateBtn().join('')}
            </form>`;
  }
  private getTemplateInput() {
    const input: any = this.options.inputs.map((i) => { // template of input
      if (this.options.errorMessages) {
        return `<div class="${this.classesForm.blockClass}">
                  <div class="${this.classesForm.errorClass} error-${i.id}">${i.error}</div>
                  <input class="checkform ${i.class} ${i.id}" data-type="${i.id}" data-valid="true" data-mask="${i.mask}" type="${i.type}" placeholder="${i.placeholder}" id="${i.id}"/>
                  <label class="${this.classesForm.labelClass} label-${i.id}" for="${i.id}">${i.label}</label>
                  </div>`;
      }
      return `<div class="${this.classesForm.blockClass}">
                <input class="checkform ${i.class} ${i.id}" data-type="${i.id}" data-valid="true" type="${i.type}" placeholder="${i.placeholder}" id="${i.id}"/>
                <label class="${this.classesForm.labelClass} label-${i.id}" for="${i.id}">${i.label}</label>
              </div>`;
    });
    return input;
  }

  private getTemplateText() {
    const text: any = this.options.textarea.map((i) => { // template of textarea
      if (this.options.errorMessages) {
        return `<div class="${this.classesForm.blockClass}">
                  <div class="${this.classesForm.errorClass} error-${i.id}">${i.error}</div>
                  <textarea class="checkform block__input ${i.class}" data-valid="true" placeholder="${i.placeholder}" id="${i.id}"></textarea>
                  <label class="${this.classesForm.labelClass} label-${i.id}" for="${i.id}">${i.label}</label>
                </div>`;
        }
      return `<div class="${this.classesForm.blockClass}">
                <textarea class="checkform block__input ${i.class}" data-valid="true" data-type="${i.id}" placeholder="${i.placeholder}" id="${i.id}"></textarea>
                <label class="${this.classesForm.labelClass} label-${i.id}" for="${i.id}">${i.label}</label>
              </div>`;
    });
    return text;
  }

  private getTemplateBtn() {
    const btn: any = this.options.btn.map((i) => `<button class="${this.classesForm.btnClass} ${i.class}" type="${i.type}">${i.text}</button>`); // template of button
    return btn;
  }
}