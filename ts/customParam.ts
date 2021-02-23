/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import MaskForm from "./mask";
import IValidObj from "./interfaces/IvalidObject";

export default class CustomParam extends MaskForm {
  validObj: IValidObj;

  /**
   * customValid
   */
  public customValid(): void {
    if (this.options.customValid) {
      this.validObj = Object.assign(this.validObj, this.options.customValid);
    } else {
      console.log("nothing to custom in validObj")
    }
  }

  /**
   * customClassesForm
   */
  public customClassesForm() : void{
    if (this.options.customClassesForm) {
      this.classesForm = Object.assign(this.classesForm, this.options.customClassesForm);
    } else {
      console.log("nothing to custom in classesForm")
    }
  }
}
