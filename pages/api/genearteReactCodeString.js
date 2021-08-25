export default function genearteReactCodeString(req, res) {
  const prettier = require('prettier');
  try {
    const { layout, components } = req.body;
    console.log('layout', layout)
    let result = [];

    function remove_linebreaks(input) {
      return input.replace(/[\r\n]+/gm, ' ').trim();
    }
    // CSS parser to convert HTML styles to JSON object.
    function parseCSSText(cssText) {
      var cssTxt = cssText.replace(/\/\*(.|\s)*?\*\//g, " ").replace(/\s+/g, " ");
      var style = {}, [,ruleName,rule] = cssTxt.match(/ ?(.*?) ?{([^}]*)}/)||[,,cssTxt];
      var cssToJs = s => s.replace(/\W+\w/g, match => match.slice(-1).toUpperCase());
      var properties = rule.split(";").map(o => o.split(":").map(x => x && x.trim()));
      for (var [property, value] of properties) style[cssToJs(property)] = value;
      return JSON.stringify(style);
  }

    const removeLinebreaks = (input) => input.replace(/[\r\n]+/gm, ' ').trim();

    const Error = (options) => ({ error: `No element found ${options.type}` });

    function Button(options) {
      this.tagName = options.type || null;
      this.id = options.id || null;
      this.value = options.value || null;
      this.style = removeLinebreaks(options.style) || null;
      this.containerStyle = options.containerStyle || null;

      console.log('this.style ', this.style1)
      console.log('this.containerStyle ', this.containerStyle)
      const temp = parseCSSText(this.containerStyle)
      console.log('parseCSSText ', temp)

      let style = { display: 'inline-block color' }
      if (this.tagName) {
        this.html = `<button style={${parseCSSText(this.style)}} type='' className='' id='${this.id}'>${this.value}</button>`;
      }

      if (this.containerStyle) {
        this.div = `<div style={${parseCSSText(this.containerStyle)}}>${this.html}</div>`;
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
      this.style = removeLinebreaks(options.style) || null;
      this.src = options.src || '';
      this.containerStyle = options.containerStyle || null;

      this.html = `<img class="fit-picture" src=${this.src} alt=${this.value} style={${parseCSSText(this.style)}}>`;

      if (this.containerStyle) {
        this.div = `<div style={${parseCSSText(this.containerStyle)}}>${this.html}</div>`;
      }

      return {
        html: this.html,
        div: this.div,
      };
    }

    function Input(options) {
      this.tagName = options.type || null;
      this.id = options.id || null;
      this.value = options.value || null;
      this.style = removeLinebreaks(options.style) || null;
      this.containerStyle = options.containerStyle || null;

      this.html = `<input style={${parseCSSText(this.style)}}>${this.value}</input>`;

      if (this.containerStyle) {
        this.div = `<div style={${parseCSSText(this.containerStyle)}}>${this.html}</div>`;
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
      this.style = removeLinebreaks(options.style) || null;
      this.containerStyle = options.containerStyle || null;

      this.html = `<h1 style={${parseCSSText(this.style)}}>${this.value}</h1>`;

      if (this.containerStyle) {
        this.div = `<div style={${parseCSSText(this.containerStyle)}}>${this.html}</div>`;
      }

      return {
        html: this.html,
        div: this.div,
      };
    }

    function H2(options) {
      this.tagName = options.type || null;
      this.id = options.id || null;
      this.value = options.value || null;
      this.style = removeLinebreaks(options.style) || null;
      this.containerStyle = options.containerStyle || null;

      this.html = `<h2 style={${parseCSSText(this.style)}}>${this.value}</h2>`;

      if (this.containerStyle) {
        this.div = `<div style={${parseCSSText(this.containerStyle)}}>${this.html}</div>`;
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
      this.style = removeLinebreaks(options.style) || null;
      this.src = options.src || null;
      this.containerStyle = options.containerStyle || null;

      this.html = `<span style={${parseCSSText(this.style)}}>${this.value}</span>`;

      if (this.containerStyle) {
        this.div = `<div style={${parseCSSText(this.containerStyle)}}>${this.html}</div>`;
      }

      return {
        html: this.html,
        div: this.div,
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
          case 'H2':
            this.elementClass = H2;
            break;
          case 'Image':
            this.elementClass = Img;
            break;
          case 'Input':
            this.elementClass = Input;
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

    const parseComponents = (coms, components) => {
      for (const component of coms) {
        const fullComponentDetails = components.find(c => c.id === component.id)
        console.log('fullComponentDetails', fullComponentDetails)
        if (fullComponentDetails) result.push(eleFactory.createElement(fullComponentDetails).div); 
      }
    };

    const parseCols = (cols, components) => {
      for (const col of cols) {
        if (col.children.length !== 0 && Array.isArray(col.children)) {
          parseComponents(col.children, components);
        }
      }
    };

    // generateCode start point.
    if (Array.isArray(layout) && layout[0].children.length !== 0) {
      const firstRowsColumns = layout[0].children
      parseCols(firstRowsColumns, components);
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

    let style = { display: 'inline-block color' }
    const generatedCodeStr1 = `<div style={ ${display} : ${style.display}} > Hello World!> </div>`

    const formattedCode = prettier.format(generatedCodeStr1, { parser: 'babel' });
    res.status(200).json({ code: formattedCode });
  } catch (e) {
    console.log(`genearteReactCodeString api error:  ${e}`);
    res.status(500).send(e);
  }
}
