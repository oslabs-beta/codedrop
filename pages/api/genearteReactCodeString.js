import { htmlGenerator } from '../../helpers/codeGen/htmlGenerator';

export default function genearteReactCodeString(req, res) {
  const prettier = require('prettier');
  try {
    const { layout, components, framework } = req.body;
    const result = [];

    const parseComponents = (coms, components) => {
      for (const component of coms) {
        const fullComponentDetails = components.find((c) => c.id === component.id);
        if (fullComponentDetails) {
          result.push(htmlGenerator(fullComponentDetails, framework));
        }
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
    if (Array.isArray(layout)) {
      for (let i = 0; i < layout.length; i++) {
        const firstRowsColumns = layout[i].children
        parseCols(firstRowsColumns, components)
      }
    }

    const createComp = (props) => {
      const div = props !== null ? props.join('') : '<div />';

      // framework specific logic
      const frameworks = {
        React: {
          head: `import React from 'react';export const SamplePro = () => { return (<div>`,
          tail: `</div>)}`,
        },
        Angular: {
          head: "import { Component } from '@angular/core'; @Component ({ selector: 'my-app', template: `<div>",
          tail: "</div>`}) export class AppComponent { appTitle: string = 'Welcome';}",
        },
      };
      // generate framework specific code string
      return `${frameworks[framework].head}${div}${frameworks[framework].tail}`;
    };

    const generatedCodeStr = createComp(result);
    const formattedCode = prettier.format(generatedCodeStr, { parser: 'babel' });
    res.status(200).json({ code: formattedCode });
  } catch (e) {
    console.log(`genearteReactCodeString api error:  ${e}`);
    res.status(500).send(e);
  }
}
