# checkform.js - easy validation for forms

1. Install & Use

2. Parameters

3. Methods

## Install & Use

### Cloning

1. Clone checkform somewhere to your project

> `git clone https://github.com/shoffkarim/checkform.git`

2. Connect the script

> `<script  type="text/javascript"  src="js/checkform.min.js"></script>`

4. Init class in your script file

>     let  valid = new  CheckForm (".validator-wrapper", {
	>     renderForm:  true,
>     });
## Terminology
|Frase & Word|Definition  |
|--|--|
| Error | `<div>` or `<p>` with error message, what showing, when input doesn't validate |
|Block|`<div>`, what contain error, input and label|
