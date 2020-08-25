# checkform.js - easy validation for forms

1. Install & Use

2. Parameters

3. Methods

## Install & Use

### Cloning

1. Clone checkform somewhere to your project

```
git clone https://github.com/shoffkarim/checkform.git
```

2. Connect the script, and styles

```
<script  type="text/javascript"  src="js/checkform.min.js"></script>
<link  rel="stylesheet"  href="css/style.css"  />
 ```

3. Init class in your script file

```
let  valid = new  CheckForm (".checkform-wrapper", {
	renderForm:  true
});
```
## Terminology
|Frase & Word|Definition  |
|--|--|
| Error | `<div>` or `<p>` with error message, what showing, when input doesn't validate |
|Block|`<div>`, what contain error, input and label|

## Parameters
#### Container class name
Type: `string`
Default: none
Example: ".checkform-wrapper"

### Configuration options
#### renderForm
Type: `boolean`
Default: none
Usage: If you have form, and want just validate it - `renderForm: false`, if you need create form - `renderForm: true`
#### inputs
Type: `array of objects`
Default: `empty`
Usage: use it if `renderForm: true`,  1 object = 1 input
Example:
```
inputs: [
{id: "email", type: "text", "class: "block__input", placeholder: "enter your email", label: "enter your email", error: "incorrect email"}
]
```

***Explanation***

`id` - id email, and it use in `for` label
Use ids  from this list:

 - name
 - nickname
 - email
 - password
 - tel
 - date
 - checkbox
 - file

`type` - type of input
These types are supported in this version

 - text
 - password
 - tel
 - date (if you use `renderForm: true`, and want use animation, use `id="date", type="text"`)
 - checkbox
 - file

`class` - class name of input (if you use lib's style - indicate `"block__input"`)
`placeholder` - placeholder for input, in lib's styles in hide for animation label
`label` - text in label
`error` - text of error

 #### textarea
 Type: `array of objects`
 Default: `empty`
 Usage: use it if `renderForm: true`,  1 object = 1 textarea
 Example:
 ```
textarea: [
{id: "textarea", class: "block__message", placeholder: "message", label: "enter your message", error: "incorrect message"},
]
 ```

 ***Explanation***

 `id` - id of textarea
 `class` - class of textarea, (if you use lib's style - indicate `"block__message"`)
 `placholder` - placeholder of textarea
 `label` - text in label
 `error` - text of error

 #### btn
 Type: `array of objects`
 Default: `empty`
 Usage: use it if `renderForm: true`,  1 object = 1 btn
 Example:
 ```
btn: [{class: "btn", type: "submit", text: "submit"}]
 ```

 ***Explanation***

 `class` - class of btn, (if you use lib's style - indicate `"btn"`)
 `type` - type of btn (recommended `"submit"`
 `text` - text of btn

 #### custom
 Type: `array of objects`
 Default: validObj, use getter `validObj()` for return it, or click here
 Usage: if you need change regExp, minLength, maxLength, size, type
 Example:
 ```
custom: [
{
	nickname:{
		reg: /^[a-zA-Z]/,
		maxLength:  11
	}
},
],
 ```

  ***Explanation***

`nickname`, `fullName`, `email`, `password`, `date`, `tel` - have `reg` field

`nickname`, `fullName`, `tel` - have `minLength` and `maxLength` fields

`email` - have `minLength` field

`file` - have `size` and `type` fields


####  errorMessages
Type: `boolean`
Default: `false`
Usage: show error message, when input doesn't validate
#### formClass
Type: `string`
Default: `validator-form`
Usage: If `renderForm: true`, this is form class name
#### blockClass
Type: `string`
Default: `block`
Usage: If `renderForm: true`, this is block class name
#### errorClass
Type: `string`
Default: `block__error`
Usage: If `renderForm: true`, this is error class name
#### labelClass
Type: `string`
Default: `block__label`
Usage: If `renderForm: true`, this is label class name
#### checkSubstr
Type: `array of objects`
Default: `empty`
Usage: If  some value should include substring
Example:
```
checkSubstr: [{id:  "name", substr:  "lol"},],
```
#### blackList
Type: `array of objects`
Default: `empty`
Usage: If  values don't should include substring
Example:
```
blackList: ["lol", "lmao"]
```
