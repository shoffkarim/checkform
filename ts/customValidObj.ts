/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import Form from "./form";
import IValidObj from "./interfaces/IvalidObject";

export default class CustomValidObj extends Form {
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
}
