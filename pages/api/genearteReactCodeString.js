export default function genearteReactCodeString(req, res) {
  const prettier = require('prettier');
  try {
    const { layout, components } = req.body;
    let codeString;
    for (const component of components) {
      codeString += `\n<div>
        <button>${component.value}</button>
      </div>`;
    }
    codeString = `import React from 'react' 

    export const MyComponent = () => (
      <div>
        ${codeString}
      </div>
    )`;
    const formattedCode = prettier.format(codeString, { parser: 'babel' });
    res.status(200).json({ code: formattedCode });
  } catch (e) {
    console.log('genearteReactCodeString api error: ', e);
    res.status(500).send(e);
  }
}
