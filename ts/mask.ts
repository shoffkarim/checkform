/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Form from "./form";
import IOptions from "./interfaces/Ioptions";
import IClassesForm from "./interfaces/IclassesForm";

export default class MaskForm extends Form {
  public maskInputs: NodeListOf<HTMLElement> = document.querySelectorAll(".checkform__mask");

  classesForm: IClassesForm;

  constructor(options: IOptions) {
    super(options);
    this.setupMask();
  }

  /**
   * setupMask
   */
  public setupMask() : void {
    console.log(this.maskInputs)
    for (let i = 0; i < this.maskInputs.length; i++) {
      this.createShell(this.maskInputs[i]);
    }
  }

  /**
   * createShell
   */
  public createShell(input: HTMLElement) : void {
    let placeholder: string = input.getAttribute("placeholder");
    console.log(1);
    input.setAttribute("maxlength", `${placeholder.length}`);
    input.setAttribute("data-placeholder", placeholder);
    input.removeAttribute("placeholder");

    let maskElement = `<span class="${this.classesForm.maskClass}">
      <span aria-hidden="true" id="${input.id}Mask"><i></i>${placeholder}</span>${input.outerHTML}</span>`
    input.outerHTML = maskElement;
  }
}