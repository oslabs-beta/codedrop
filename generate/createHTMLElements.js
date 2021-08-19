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

  return {
		'test': 'does this work:',
		'html': this.html
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
      case "button":
        this.elementClass = Button;
        break;
      case "h1":
        this.elementClass = H1;
        break;
    }
    // default elementClass is Error
    return new this.elementClass(options);
  }
}

// Our default ElementClass is Error object
HTMLElementFactory.prototype.elementClass = Error


var eleFactory = new HTMLElementFactory()

const btn = eleFactory.createElement({"id": "v8ogVvw1d",
"type": "Button",
"value": "Click me!",
"style": "display: inline-block;\ncolor: palevioletred;\nfont-size: 1em;\nmargin: 1em;\npadding: 0.25em 1em;\nborder: 2px solid palevioletred;\nborder-radius: 3px;\ndisplay: block;"})

console.log(btn)

export default createHTMLElements;