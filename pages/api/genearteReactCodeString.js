import { htmlGenerator } from '../../helpers/codeGen/htmlGenerator';

export default function genearteReactCodeString(req, res) {
  const prettier = require('prettier');
  try {
    const { layout, components } = req.body;
    let result = [];
    
    const parseComponents = (coms, components) => {
      for (const component of coms) {
        const fullComponentDetails = components.find((c) => c.id === component.id);
        if (fullComponentDetails) result.push(htmlGenerator(fullComponentDetails))
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
      const firstRowsColumns = layout[0].children;
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
    const formattedCode = prettier.format(generatedCodeStr, { parser: 'babel' });
    res.status(200).json({ code: formattedCode });
  } catch (e) {
    console.log(`genearteReactCodeString api error:  ${e}`);
    res.status(500).send(e);
  }
}
