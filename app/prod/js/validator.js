const getTemplate = (inputs = [], textarea = [], btn = []) => { // function what return inputs, button, and full form

  const id = inputs.map(i => {
    return `<div class="block">
              <div class="block__error error-${i.id}">${i.error}</div>
              <input class="validator ${i.class} ${i.id}" data-type="${i.id}" type="${i.type}" placeholder="${i.placeholder}" id="${i.id}"/>
              <label class="block__label label-${i.id}" for="${i.id}">${i.label}</label>
            </div>`
  });

  const text = textarea.map(i => {
    return `<div class="block">
              <div class="block__error error-${i.id}">${i.error}</div>
              <textarea class="block__input ${i.class}" placeholder="${i.placeholder}" id="${i.id}"></textarea>
              <label class="block__label label-${i.id}" for="${i.id}">${i.label}</label>
            </div>`
  });

  const button = btn.map(i => {
    return `<button class="${i.class}" type="${i.type}">${i.text}</button>`
  });
  return `<form>
            ${id.join('')}
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

  #render () { // require full form
    const {inputs, textarea, btn} = this.options
    this.el.innerHTML = getTemplate(inputs, textarea, btn);
  }

  #setup () { // req clickhandler
    this.clickHandler = this.clickHandler.bind(this);
    const inputsList = document.querySelectorAll(".validator");
    inputsList.forEach(i => {
      i.addEventListener('focus', this.clickHandler),
      i.addEventListener('blur', this.clickHandler)
    }
    );
  }
  clickHandler (event) { //handler events
    const input = event.target;
    switch (event.type) {
      case "focus":
        input.classList.add("js-input-focus");
        break;
      case "blur":
        if(input.value != "") {
          input.classList.add("js-input-focus");
        } else input.classList.remove("js-input-focus");
        break;
      default:
        break;
    }
  }
}
let valid = new Validator (".validator-form", { //init class
  inputs: [
    {id: "email", type: "text", class: "block__input", placeholder: "enter your email", label: "enter your email", error: "incorrect name"},
    {id: "name", type: "text", class: "block__input", placeholder: "enter your name", label: "enter your name", error: "incorrect email"},
    {id: "password", type: "password", class: "block__input", placeholder: "password", label: "password", error: "incorrect password"},
    {id: "number", type: "tel", class: "block__input", placeholder: "number", label: "number", error: "incorrect number"},
    {id: "date", type: "date", class: "block__input", placeholder: "date", label: "date", error: "incorrect date"},
    {id: "checkbox", type: "checkbox", class: "block__input", placeholder: "checkbox", label: "checkbox", error: "incorrect check"},
    {id: "file", type: "file", class: "block__input", placeholder: "file", label: "file", error: "incorrect file"}

  ],
  textarea: [
    {id: "text", class: "block__message", placeholder: "message", label: "enter your message", error: "incorrect message"},
  ],
  btn: [
    {class: "btn", type: "submit", text: "submit"}
  ]
});
