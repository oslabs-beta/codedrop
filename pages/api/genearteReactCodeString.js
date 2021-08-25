export default function genearteReactCodeString(req, res) {
  const prettier = require('prettier');
  try {
    const { layout, components } = req.body;
    let result = []

    // CSS parser to convert HTML styles to JSON object.
    function parseCSSText(cssText) {
      const styleObj = {};

      cssText.split('\n').forEach((item) => {
        let temp = item.split(':');
        let styleValue = temp[1].replace(';', '').trim();
        let styleProp = temp[0];
        styleObj[styleProp] = styleValue;
      });

      return JSON.stringify(styleObj);
    }

    function remove_linebreaks(input) {
      return input.replace(/[\r\n]+/gm, ' ').trim();
    }

    function Button(options) {
      this.tagName = options.type || null;
      this.id = options.id || null;
      this.value = options.value || null;
      this.style = remove_linebreaks(options.style) || null;
      this.containerStyle = options.containerStyle || null;

      if (this.tagName) {
        this.html = `<button style="${this.style}" type='' className='' id='${this.id}'> ${this.value} </button>`;
      }

      if (this.containerStyle) {
        this.div = `<div style= "${this.containerStyle}" > ${this.html}</div>`;
      }
      return {
        test: 'does this work:',
        html: this.html,
        div: this.div,
      };
    }

    function Img(options) {
      this.tagName = options.type || null;
      this.id = options.id || null;
      this.value = options.value || null;
      this.style = remove_linebreaks(options.style) || null;
      this.src = options.src || '';
      this.containerStyle = options.containerStyle || null;

      this.html = `<img class="fit-picture" src=${this.src} alt=${this.value} style="${this.style}">`;

      if (this.containerStyle) {
        this.div = `<div style="${this.containerStyle}">${this.html}</div>`;
      }

      return {
        html: this.html,
        div: this.div,
      };
    }

    function H1(options) {
      this.tagName = options.type || null;
      this.id = options.id || null;
      this.value = options.value || null;
      this.style = remove_linebreaks(options.style) || null;
      this.containerStyle = options.containerStyle || null;

      this.html = `<h1 style="${this.style}">${this.value}</h1>`;

      if (this.containerStyle) {
        this.div = `<div style="${this.containerStyle}">${this.html}</div>`;
      }

      return {
        html: this.html,
        div: this.div,
      };
    }

    function Text(options) {
      this.tagName = options.type || null;
      this.id = options.id || null;
      this.value = options.value || null;
      this.style = remove_linebreaks(options.style) || null;
      this.src = options.src || null;
      this.containerStyle = options.containerStyle || null;

      this.html = `<span style="${this.style}">${this.value}</span>`;

      if (this.containerStyle) {
        this.div = `<div style="${this.containerStyle}">${this.html}</div>`;
      }

      return {
        html: this.html,
        div: this.div,
      };
    }

    function Error(options) {
      return {
        error: `No element found ${options.type}`,
      };
    }

    // Define a HTMLElementFactory class
    class HTMLElementFactory {
      constructor() {}
      // Factory method for creating elements
      createElement(options) {
        switch (options.type) {
          case 'Button':
            this.elementClass = Button;
            break;
          case 'H1':
            this.elementClass = H1;
            break;
          case 'Image':
            this.elementClass = Img;
            break;
          case 'Text':
            this.elementClass = Text;
            break;
        }
        // default elementClass is Error
        return new this.elementClass(options);
      }
    }

    // Our default ElementClass is Error object
    HTMLElementFactory.prototype.elementClass = Error;

    const eleFactory = new HTMLElementFactory();

    const parseComponentsHelper = (compData, components) => {
      const { id, type } = compData;
      
      for (let i = 0; i < components.length; i++) {
        let component = components[i];

        if (component) {
          result.push(eleFactory.createElement(component).div);
        }
      }
    };

    const parseComponents = (coms, components) => {
      for (let i = 0; i < coms.length; i++) {
        parseComponentsHelper(coms[i], components);
      }
    };

    const parseCols = (cols, components) => {
      for (let i = 0; i < cols.length; i++) {
        const col = cols[i];
        if (col.children.length !== 0 && Array.isArray(col.children)) {
          parseComponents(col.children, components);
        }
      }
    };

    // generateCode start point.
    if (Array.isArray(layout) && layout[0].children.length !== 0) {
      parseCols(layout[0].children, components);
    }

    const createComp = (props) => {
      const div = props !== null ? props.join('') : '<div />';

      return [
        `import React from 'react';`,
        `export const SamplePro = () => {`,
        `return (`,
        `<div>`,
        `${div}`,
        `</div>`,
        `);`,
        `}`,
      ]
        .filter((line) => typeof line === 'string')
        .join('\n');
    };

    const generatedCodeStr = createComp(result);
    const formattedCode = prettier.format(generatedCodeStr, { parser: 'babel' });
    res.status(200).json({ code: formattedCode });
  } catch (e) {
    console.log(`genearteReactCodeString api error:  ${e}`);
    res.status(500).send(e);
  }
}
