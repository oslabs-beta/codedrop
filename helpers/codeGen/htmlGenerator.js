import { parseCSSText } from './parseCSSText';
import { removeLinebreaks } from './removeLinebreaks';

export const htmlGenerator = (fullComponentDetails, framework) => {
  const { containerStyle, id, style, value } = fullComponentDetails;
  const inlineContainerStyleWoLineBreaks = removeLinebreaks(containerStyle)
  const inlineContainerStyle = parseCSSText(inlineContainerStyleWoLineBreaks);
  const inlineStyleWoLineBreaks = removeLinebreaks(style);
  const inlineStyle = parseCSSText(inlineStyleWoLineBreaks);

  class React {
    constructor() {}
    getBody(){
      const generateChildHtml = () => {
        if (fullComponentDetails.type === 'H1') {
          return `<h1 style={${inlineStyle}}>${value}</h1>`;
        }
        if (fullComponentDetails.type === 'H2') {
          return `<h2 style={${inlineStyle}}>${value}</h1>`;
        }
        if (fullComponentDetails.type === 'Img') {
          return `<img class="fit-picture" src='${src}' alt='${value}' style={${inlineStyle}} />`;
        }
        if (fullComponentDetails.type === 'Button') {
          return `<button style={${inlineStyle}} type='' className='' id='${id}'>${value}</button>`;
        }
        if (fullComponentDetails.type === 'Text') {
          return `<span style={${inlineStyle}}>${value}</span>`;
        }
        if (fullComponentDetails.type === 'Input') {
          return `<input style={${inlineStyle}}>${value}</input>`;
        }
      };
      return `<div style={${inlineContainerStyle}}>${generateChildHtml()}</div>`;
    }
  }
  
  class Angular {
    constructor() {}
    getBody(){
      const generateChildHtml = () => {
        if (fullComponentDetails.type === 'H1') {
          return `<h1 style="${inlineStyleWoLineBreaks}">${value}</h1>`;
        }
        if (fullComponentDetails.type === 'H2') {
          return `<h2 style="${inlineStyleWoLineBreaks}">${value}</h1>`;
        }
        if (fullComponentDetails.type === 'Img') {
          return `<img class="fit-picture" src='${src}' alt='${value}' style="${inlineStyleWoLineBreaks}" />`;
        }
        if (fullComponentDetails.type === 'Button') {
          return `<button style="${inlineStyleWoLineBreaks}" type='' className='' id='${id}'>${value}</button>`;
        }
        if (fullComponentDetails.type === 'Text') {
          return `<span style="${inlineStyleWoLineBreaks}">${value}</span>`;
        }
        if (fullComponentDetails.type === 'Input') {
          return `<input style="${inlineStyleWoLineBreaks}">${value}</input>`;
        }
      };
      return `<div style="${inlineContainerStyleWoLineBreaks}">${generateChildHtml()}</div>`;
    }
  }

  const frameworks = {
    'Angular': Angular,
    'React': React,
  }

  class GenerateCode {
    constructor(framework) {
      this.framework = new frameworks[framework]() 
    } 
    getBody() {
      return this.framework.getBody()
    }
  }

  const formattedCode = new GenerateCode(framework)

  return formattedCode.getBody()
};

