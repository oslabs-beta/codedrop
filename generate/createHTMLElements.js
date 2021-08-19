import sample_data_comp from '../components/dnd/sample-component-data';

/**
 * 
 * @param {*} options 
 * @returns 
 */

function remove_linebreaks( input ) {
  return input.replace( /[\r\n]+/gm, " ").trim();
}

function Button (options) {
  this.tagName = options.type || null;
  this.id = options.id || null;
  this.value = options.value || null;
  this.style = remove_linebreaks(options.style) || null
  this.containerStyle = options.containerStyle || null

  if (this.tagName) {
    this.html = `<button style="${this.style}" type=${this.type} class=${this.class} id=${this.id}> ${this.value} </button>`
  }

  if (this.containerStyle) {
    this.div = `<div style="${this.containerStyle}">${this.html}</div>`
  }

  console.log('this.style ', this.style)
  return {
		'test': 'does this work:',
		'html': this.html,
		'div': this.div
	}

}

function Img (options) {
  this.tagName = options.type || null;
  this.id = options.id || null;
  this.value = options.value || null;
  this.style = remove_linebreaks(options.style) || null
  this.src = options.src || null;
  this.containerStyle = options.containerStyle || null

  this.html = `<img class="fit-picture" src=${this.src} alt=${this.value} style="${this.style}">`

  if (this.containerStyle) {
    this.div = `<div style="${this.containerStyle}">${this.html}</div>`
  }

  return {
    'html': this.html,
    'div': this.div
  }
}

function H1 (options) {
  this.tagName = options.type || null;
  this.id = options.id || null;
  this.value = options.value || null;
  this.style = remove_linebreaks(options.style) || null
  this.src = options.src || null;
  this.containerStyle = options.containerStyle || null

  this.html = `<img class="fit-picture" src=${this.src} alt=${this.value} style="${this.style}">`
  
  if (this.containerStyle) {
    this.div = `<div style="${this.containerStyle}">${this.html}</div>`
  }

  return {
    'html': this.html,
    'div': this.div
  }
}

function Error(options) {
  return {
    error: `No element found ${options.type}`
  }
}

// Define a HTMLElementFactory class
class HTMLElementFactory {
  constructor() { }
  // Factory method for creating elements
  createElement(options) {

    switch (options.type) {
      case "Button":
        this.elementClass = Button;
        break;
      case "H1":
        this.elementClass = H1;
        break;
      case 'Image':
        this.elementClass = Img
        break;
    }
    // default elementClass is Error
    return new this.elementClass(options);
  }
}

// Our default ElementClass is Error object
HTMLElementFactory.prototype.elementClass = Error


var eleFactory = new HTMLElementFactory()


export default eleFactory;