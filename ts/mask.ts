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
  public activateMask() : void {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.handleValueChange = this.handleValueChange.bind(this);
    this.maskInputs = document.querySelectorAll(".mask .checkform__mask");
    for (let i = 0; i < this.maskInputs.length; i++) {
      // eslint-disable-next-line @typescript-eslint/unbound-method
      this.maskInputs[i].addEventListener("keyup", this.handleValueChange)
    }
    // this.maskInputs.forEach(function (i) {
    //   i.addEventListener("click", this.handleValueChange)
    // })
  }

  /**
   * handleValueChange
   */
  public handleValueChange(event: KeyboardEvent) : void {
    let input = <HTMLInputElement>event.srcElement;
    let id = input.id;

    switch (event.keyCode) { // exclusion of special keys
      case 20:
      case 17:
      case 18:
      case 16:
      case 37:
      case 38:
      case 39:
      case 40:
      case 9:
        return;
        break;
      default:
        break;
    }

    input.value = this.handleCurrentValue(event);
    document.getElementById(`${id}Mask`).innerHTML = this.setValueMask(event);
  }

  /**
   * handleCurrentValue
   */
  public handleCurrentValue(event: KeyboardEvent) : string {
    console.log(event, this.classesForm);
    return '';
  }

  /**
   * setValueMask
   */
  public setValueMask(event: KeyboardEvent) : string {
    console.log(event, this.classesForm);
    return '';
  }
}