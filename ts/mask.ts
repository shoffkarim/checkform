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
    this.activateMask();
  }

  /**
   * setupMask
   */
  public setupMask() : void {
    for (let i = 0; i < this.maskInputs.length; i++) {
      this.createMask(this.maskInputs[i]);
    }
  }

  /**
   * createMask
   */
  public createMask(input: HTMLElement) : void {
    let placeholder: string = input.getAttribute("placeholder");
    input.setAttribute("maxlength", `${placeholder.length}`);
    input.setAttribute("data-placeholder", placeholder);
    input.removeAttribute("placeholder");

    let maskElement = `<span class="${this.classesForm.maskClass}">
      <span aria-hidden="true" id="${input.id}Mask"><i></i>${placeholder}</span>${input.outerHTML}</span>`
    input.outerHTML = maskElement;
  }

  /**
   * activateMask
   */
  public activateMask() : void{
    this.maskInputs = document.querySelectorAll(".mask .checkform__mask")
    this.maskInputs.forEach(function (i) {
      i.addEventListener("keyup", function (e) {
        handleValueChange(e);
      }, false);
    })
  }

  /**
   * handleValueChange
   */
  public handleValueChange(e: Event) : void {
    console.log(e, this.classesForm);
  }
}