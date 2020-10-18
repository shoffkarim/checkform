import { Form } from './form'
import { IOptions } from './interfaces/Ioptions'

export class CustomValidObj extends Form{

  constructor(options: IOptions) {
    super(options);
  }

  // customObject() { // customization validObj
  //   // eslint-disable-next-line no-restricted-syntax
  //   for (const key in this.options.custom) {
  //     if (this.options.custom.hasOwnProperty.call(this.options.custom, key)) {
  //       // eslint-disable-next-line no-restricted-syntax
  //       for (const validObjKey in this.validObj) {
  //         if (this.validObj.hasOwnProperty.call(this.validObj, validObjKey)) {
  //           if (validObjKey === key) {
  //             this.validObj[validObjKey] = this.options.custom[key];
  //           }
  //         }
  //       }
  //     }
  //   }
  // }

}
