const getTemplate = (inputs = [], textarea = [], btn = []) => { // function what return inputs, button, and full form

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
    return `<button class="validator ${i.class}" type="${i.type}">${i.text}</button>`
  });
  return `<form>
            ${input.join('')}
            ${text.join('')}
            ${button.join('')}
          </form>`;
}

class Validator {
  constructor (el, options) {
    this.el = document.querySelector(el);
    this.options = options;
    this.#render();
    this.#setup();
  }
  validObj = { // object for abstract programming
    nickname: {
      reg: /^[а-яА-Я]/,
    },
    email: {
      reg: /^(?!.*@.*@.*$)(?!.*@.*--.*..*$)(?!.*@.*-..*$)(?!.*@.*-$)(.*@.+(..{1,11})?)$/,
    },
    password: {
      reg: {
        b6: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
      },
    },
    date: {
      reg: {
        first: /^\d{4}[./-]\d{2}[./-]\d{2}$/,
        sec: /^\d{2}[./-]\d{2}[./-]\d{4}$/,
      },
    },
    tel: {
      reg: {
        // eslint-disable-next-line no-useless-escape
        russian: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
        american: /^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/,
      },
    },
    file: {
      size: {
        mb10: 10025711,
      },
      type: {
        image: "image",
      },
    },
  };

  #render () { // require full form
    const {inputs, textarea, btn} = this.options
    this.el.innerHTML = getTemplate(inputs, textarea, btn);
  }

  #setup () { // req clickhandler
    this.focusBlurHandler = this.focusBlurHandler.bind(this);
    const inputsList = document.querySelectorAll(".validator");
    inputsList.forEach(i => {
      i.addEventListener('focus', this.focusBlurHandler),
      i.addEventListener('blur', this.focusBlurHandler)
    });
    const btn = document.querySelector("button.validator");
    this.clickHandler = this.clickHandler.bind(this);
    btn.addEventListener('click', this.clickHandler);
  }

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
  }

  #RegCheck (reg, val, block) { // function for check regexp
    if (!reg.test(val)) {
      console.log(1);
      block.classList.add("error");
      block.classList.remove("good");
    } else {
      console.log(0);
      block.classList.remove("error");
      block.classList.add("good");
    }
  }

  clickHandler (event) { // validation when click submit
    event.preventDefault();
    const btn = event.target;
    const inputsList = document.querySelectorAll("[data-valid=true]");
    inputsList.forEach(block => {
      let val = block.value;
      switch (block.getAttribute("id")) { // all inputs should have id
        case "name":
          let nameReg = new RegExp(this.validObj.nickname.reg);
          this.#RegCheck(nameReg, val, block);
          break;
        case "email":
          let emailReg = new RegExp(this.validObj.email.reg);
          this.#RegCheck(emailReg, val, block);
          break;
        case "password":
          let passwordReg = new RegExp(this.validObj.password.reg.b6);
          this.#RegCheck(passwordReg, val, block);
          break;
        case "date":
          let dateReg = new RegExp(this.validObj.date.reg.first);
          this.#RegCheck(dateReg, val, block);
          break;
        case "tel":
          let telReg = new RegExp(this.validObj.tel.reg.russian);
          this.#RegCheck(telReg, val, block);
          break;
        case "checkbox":
          if (!block.checked) {
            block.classList.add("error");
            block.classList.remove("good");
          } else {
            block.classList.remove("error");
            block.classList.add("good");
          }
          break;
        case "file":
          let file = block.files[0]; // check for empty
          if (val === "") {
            block.classList.add("error");
            block.classList.remove("good");
          } else if (!file.type.startsWith(validObj.file.type.image)) { // check for type of file
            block.classList.add("error");
            block.classList.remove("good");
            if (!(file.size < validObj.file.size.mb10)) { // check size file
              block.classList.add("error");
              block.classList.remove("good");
            }
          } else {
            block.classList.remove("error");
            block.classList.add("good");
          }
          break;
        case "textarea":
          if (val === "") {
            block.classList.add("error");
            block.classList.remove("good");
          } else {
            block.classList.remove("error");
            block.classList.add("good");
          }
        default:
          console.log("def");
      }
    });
  }
}
let valid = new Validator (".validator-form", { //init class
  inputs: [
    {id: "email", type: "text", class: "block__input", placeholder: "enter your email", label: "enter your email", error: "incorrect name"},
    {id: "name", type: "text", class: "block__input", placeholder: "enter your name", label: "enter your name", error: "incorrect email"},
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
  ]
});
