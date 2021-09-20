import { parseCSSText } from './parseCSSText';
import { removeLinebreaks } from './removeLinebreaks';

export const htmlGenerator = (fullComponentDetails, framework) => {
  const { containerStyle, id, style, value } = fullComponentDetails;
  const inlineContainerStyle = parseCSSText(removeLinebreaks(containerStyle));
  const inlineStyle = parseCSSText(removeLinebreaks(style));

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

  if (framework === "Angular") return `<div style="${inlineContainerStyle}">${generateChildHtml()}</div>`;

  return `<div style={${inlineContainerStyle}}>${generateChildHtml()}</div>`;
};

