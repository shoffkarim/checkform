/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import IValidObj from "./IvalidObject";
import IClassesForm from "./IclassesForm";

interface IOptionsCheckSubstr {
  id?: string;
  substr?: string;
}

export default interface IOptions {
  customValid?: IValidObj;
  errorMessages?: boolean;
  customClassesForm?: IClassesForm;
  checkSubstr?: IOptionsCheckSubstr[];
  blackList?: string[];
}
