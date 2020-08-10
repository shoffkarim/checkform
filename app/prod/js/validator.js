class Validator {
  constructor (el, options) {
    this.el = document.querySelector(el);
    this.options = options;
    this.#render();
    this.#setup();
  };

  validObj = { // object parameters of validation
    nickname: {
      reg: /^[а-яА-Я]/,
      minLength: 1,
      maxLength: 15
    },
    email: {
      reg: /^(?!.*@.*@.*$)(?!.*@.*--.*..*$)(?!.*@.*-..*$)(?!.*@.*-$)(.*@.+(..{1,11})?)$/,
      minLength: 1,
    },
    password: {
      reg: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/, //min 6 chars
    },
    date: {
      reg: /^\d{4}[./-]\d{2}[./-]\d{2}$/, //first type gggg-mm-dd and sec type dd-mm-gggg /^\d{2}[./-]\d{2}[./-]\d{4}$/
    },
    tel: {
      // eslint-disable-next-line no-useless-escape
      reg: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/, //russian tel and american tel /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/,
      minLength: 1,
      maxLength: 20
    },
    file: {
      size:  10025711, //10mb
      type: "image",
    },
  };

  get validObj (){
    return this.validObj;
  };

  set validObj (obj){
    this.validObj = obj;
  };

  #getTemplate (inputs = [], textarea = [], btn = []) { // method what return inputs, button, and full form

    const input = inputs.map(i => { // template of input
      return `<div class="block">
                <div class="block__error error-${i.id}">${i.error}</div>
                <input class="validator ${i.class} ${i.id}" data-type="${i.id}" data-valid="true" type="${i.type}" placeholder="${i.placeholder}" id="${i.id}"/>
                <label class="block__label label-${i.id}" for="${i.id}">${i.label}</label>
              </div>`
    });

    const text = textarea.map(i => { //template of textarea
      return `<div class="block">
                <div class="block__error error-${i.id}">${i.error}</div>
                <textarea class="validator block__input ${i.class}" data-valid="true" placeholder="${i.placeholder}" id="${i.id}"></textarea>
                <label class="block__label label-${i.id}" for="${i.id}">${i.label}</label>
              </div>`
    });

    const button = btn.map(i => { // template button
      return `<button class="validator-btn ${i.class}" type="${i.type}">${i.text}</button>`
    });
    return `<form method="POST">
              ${input.join('')}
              ${text.join('')}
              ${button.join('')}
            </form>`;
  };

  #useForm(){
    return true
  };

  #render () { // require full form
    const {inputs, textarea, btn} = this.options;
    const {custom} = this.options;
    const {renderForm} =this.options;
    this.#customObject(custom);
    if(renderForm){ // if user use render form
      this.el.innerHTML = this.#getTemplate(inputs, textarea, btn);
    } else { //if user use his form
      this.#useForm();
    }
  };

  #setup () { // req clickhandler
    this.focusBlurHandler = this.focusBlurHandler.bind(this);
    const inputsList = document.querySelectorAll(".validator");
    inputsList.forEach(i => {
      i.addEventListener('focus', this.focusBlurHandler),
      i.addEventListener('blur', this.focusBlurHandler)
    });
    const btn = document.querySelector(".validator-btn");
    this.clickHandler = this.clickHandler.bind(this);
    btn.addEventListener('click', this.clickHandler);
  };

  focusBlurHandler (event) { //handler events
    const input = event.target;
    switch (event.type) {
      case "focus":
        if (input.id == "date") input.type = "date"
        input.classList.add("js-input-focus");
        break;
      case "blur":
        if(input.value != "") {
          input.classList.add("js-input-focus");
        } else {
          if (input.id == "date") {
            input.type = "text";
          }
          input.classList.remove("js-input-focus");
        }
        break;
      default:
        break;
    }
  };

  #cycleObj (name, key, value) {
    for (const z in this.validObj) { //cycle on validobj
      if (this.validObj.hasOwnProperty(z)) { // z - name of field, this.validObj[z] - field
        for (const y in this.validObj[z]) {
          if (this.validObj[z].hasOwnProperty(y)) {
            if (z === name)
              if(y === key)
                this.validObj[z][y] = value;
          }
        }
      }
    }
  };

  #customObject (custom) { //customization validObj
    for (let i = 0; i < custom.length; i++) { //cycle on custom mas
      for (const j in custom[i]) { //cycle on custom mas obj's
        if (custom[i].hasOwnProperty(j)) { //j - name of type input, custom[i] - object witn custom fields
          for (const k in custom[i][j]) { //cycle on obj's fields
            if (custom[i][j].hasOwnProperty(k)) { //k - name of custom key, custom[i][j] - custom object, custom[i][j][k] - custom value
              this.#cycleObj(j, k, custom[i][j][k])
            }
          }
        }
      }
    }
  };

  showErrorMessage (block) {
    let errorBlock = block.previousElementSibling;
    errorBlock.style.display = 'block';
    errorBlock.style.opacity = '1';
    block.classList.add("error");
    block.classList.remove("good");
  };

  hideErrorMessage (block) {
    let errorBlock = block.previousElementSibling;
    errorBlock.style.display = 'none';
    errorBlock.style.opacity = '0';
    block.classList.remove("error");
    block.classList.add("good");
  };

  #regCheck (val, block, reg, minLength = 0, maxLength = 1000) { // function for check regexp
    if (val.length < minLength || val.length > maxLength) {
      this.showErrorMessage(block);
    } else {
      if (!reg.test(val)) {
        this.showErrorMessage(block);
      } else {
        this.hideErrorMessage(block);
      }
    }
  };

  alertWin () {
    const inputsList = document.querySelectorAll("[data-valid=true]");
    const goodInputs = document.querySelectorAll(".good");
    if (inputsList.length === goodInputs.length){
      alert("win");
    } else return false;
  };

  clickHandler (event) { // validation when click submit
    event.preventDefault();
    const inputsList = document.querySelectorAll("[data-valid=true]");
    inputsList.forEach(block => {
      let val = block.value;
      switch (block.getAttribute("id")) { // all inputs should have id
        case "name":
          let nameReg = new RegExp(this.validObj.nickname.reg);
          this.#regCheck(val, block, nameReg, this.validObj.nickname.minLength, this.validObj.nickname.maxLength);
          break;
        case "email":
          let emailReg = new RegExp(this.validObj.email.reg);
          this.#regCheck(val, block, emailReg, this.validObj.email.minLength, this.validObj.email.maxLength);
          break;
        case "password":
          let passwordReg = new RegExp(this.validObj.password.reg);
          this.#regCheck(val, block, passwordReg);
          break;
        case "date":
          let dateReg = new RegExp(this.validObj.date.reg);
          this.#regCheck(val, block, dateReg);
          break;
        case "tel":
          let telReg = new RegExp(this.validObj.tel.reg);
          this.#regCheck(val, block, telReg, this.validObj.tel.minLength, this.validObj.tel.maxLength);
          break;
        case "checkbox":
          if (!block.checked) {
            this.showErrorMessage(block);
          } else {
            this.hideErrorMessage(block);
          }
          break;
        case "file":
          let file = block.files[0]; // check for empty
          if (val === "") {
            this.showErrorMessage(block);
          } else if (!file.type.startsWith(this.validObj.file.type)) { // check for type of file
            this.showErrorMessage(block);
            if (!(file.size < this.validObj.file.size)) { // check size file
              this.showErrorMessage(block);
            }
          } else {
            this.hideErrorMessage(block);
          }
          break;
        case "textarea":
          if (val === "") {
            this.showErrorMessage(block);
          } else {
            this.hideErrorMessage(block);
          }
          break;
        default:
          console.log("def");
      }
    });
    this.alertWin();
  };

};

let valid = new Validator (".validator-form", { //init class
  renderForm: true,
  inputs: [
    {id: "email", type: "text", class: "block__input", placeholder: "enter your email", label: "enter your email", error: "incorrect email"},
    {id: "name", type: "text", class: "block__input", placeholder: "enter your name", label: "enter your name", error: "incorrect name"},
    {id: "password", type: "password", class: "block__input", placeholder: "password", label: "password", error: "incorrect password"},
    {id: "tel", type: "tel", class: "block__input", placeholder: "number", label: "number", error: "incorrect number"},
    {id: "date", type: "text", class: "block__input", placeholder: "date", label: "date", error: "incorrect date"}, // must indicate type text for date, for good animation
    {id: "checkbox", type: "checkbox", class: "block__input", placeholder: "checkbox", label: "checkbox", error: "incorrect check"},
    {id: "file", type: "file", class: "block__input", placeholder: "file", label: "file", error: "incorrect file"}

  ],
  textarea: [
    {id: "textarea", class: "block__message", placeholder: "message", label: "enter your message", error: "incorrect message"},
  ],
  btn: [
    {class: "btn", type: "submit", text: "submit"}
  ],
  custom: [
    {nickname: {
      reg: /^[a-zA-Z]/,
      maxLength: 11
    }},
  ]
});
