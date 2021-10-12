import { parseCSSText } from './parseCSSText';
import { removeLinebreaks } from './removeLinebreaks';

export const htmlGenerator = (fullComponentDetails, framework) => {
  const { containerStyle, id, style, src, value } = fullComponentDetails;
  const inlineContainerStyleWoLineBreaks = removeLinebreaks(containerStyle);
  const inlineContainerStyle = parseCSSText(inlineContainerStyleWoLineBreaks);
  const inlineStyleWoLineBreaks = removeLinebreaks(style);
  const inlineStyle = parseCSSText(inlineStyleWoLineBreaks);

  const reactElements = {
    H1: `<h1 style={${inlineStyle}}>${value}</h1>`,
    H2: `<h2 style={${inlineStyle}}>${value}</h2>`,
    Img: `<img class="fit-picture" src='${src}' alt='${value}' style={${inlineStyle}} />`,
    Button: `<button style={${inlineStyle}} type='' className='' id='${id}'>${value}</button>`,
    Text: `<span style={${inlineStyle}}>${value}</span>`,
    Input: `<input style={${inlineStyle}}>${value}</input>`,
    H3: `<h3 style={${inlineStyle}}>${value}</h3>`
  }

  class React {
    constructor() {}
    getBody() {
      const generateChildHtml = () => reactElements[fullComponentDetails.type];
      return `<div style={${inlineContainerStyle}}>${generateChildHtml()}</div>`;
    }
  }

  const AngularElements = {
    H1: `<h1 style="${inlineStyleWoLineBreaks}">${value}</h1>`,
    H2: `<h2 style="${inlineStyleWoLineBreaks}">${value}</h1>`,
    Img: `<img class="fit-picture" src='${src}' alt='${value}' style="${inlineStyleWoLineBreaks}" />`,
    Button: `<button style="${inlineStyleWoLineBreaks}" type='' className='' id='${id}'>${value}</button>`,
    Text: `<span style="${inlineStyleWoLineBreaks}">${value}</span>`,
    Input: `<input style="${inlineStyleWoLineBreaks}">${value}</input>`,
    H3: `<h3 style="${inlineStyleWoLineBreaks}">${value}</h3>`
  }

  class Angular {
    constructor() {}
    getBody() {
      const generateChildHtml = () => AngularElements[fullComponentDetails.type];
      return `<div style="${inlineContainerStyleWoLineBreaks}">${generateChildHtml()}</div>`;
    }
  }

  const frameworks = {
    Angular: Angular,
    React: React,
  };

  class GenerateCode {
    constructor(framework) {
      this.framework = new frameworks[framework]();
    }
    getBody() {
      return this.framework.getBody();
    }
  }

  const formattedCode = new GenerateCode(framework);

  return formattedCode.getBody();
};
