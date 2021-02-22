/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Form from "./form";
import IOptions from "./interfaces/Ioptions";
import IClassesForm from "./interfaces/IclassesForm";

export default class MaskForm extends Form {
  public maskInputs: NodeListOf<HTMLElement>;

  public maskedNumber: string;

  public maskedLetter: string;

  classesForm: IClassesForm;

  constructor(options: IOptions) {
    super(options);
    this.maskInputs = document.querySelectorAll(".checkform__mask");
    this.maskedNumber = "XdDmMyY9";
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
    let input = <HTMLInputElement>event.target;
    let placeholder: string = input.getAttribute("data-placeholder");
    let value: string = input.value
    let placeholderLength: number = placeholder.length
    let newValue = "";
    let strippedValue: string = value.replace(/\D/g, "");

    for (let i = 0, j = 0; i < placeholderLength; i++) {
        let isInt = !isNaN(parseInt(strippedValue[j]));
        let matchesNumber: boolean = this.maskedNumber.indexOf(placeholder[i]) >= 0;

        if (matchesNumber && isInt) {
          newValue += strippedValue[j++];
        } else if (matchesNumber && !isInt) {
          return newValue;
        } else {
          newValue += placeholder[i];
        }
    }
    return newValue;
  }

  /**
   * setValueMask
   */
  public setValueMask(event: KeyboardEvent) : string {
    let input = <HTMLInputElement>event.target;
    let value: string = input.value;
    let placeholder: string = input.getAttribute("data-placeholder");
    return `<i>${value}</i>${placeholder.substr(value.length)}`;
  }
}