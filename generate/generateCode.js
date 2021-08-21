const indent = (index, str) => {
  return str && '\t'.repeat(index) + str;
}

const ostr = (condition, string) => {
  return condition ? string : null
}

const createComp = (props) => {
  
  console.log('createCom props', props)

  const div = props !== null ? props.join('') : '<div />'

  return [
    `import React from 'react';`,
    `export const SamplePro = () => {`,
    `return (`,
    `<div>`,
    `${div}`,
    `</div>`,
    `);`,
    `}`,
    ].filter(line => typeof line === 'string').join('\n');
}

// this will output
/*
import React from 'react';
export const samplePro = () => {
    return (
        <div />
    );
}
*/

/*
return [
    indent(0, ostr(true, "import React from 'react';")),
    indent(0, 'export const samplePro = () => {'),
    indent(1, 'return ('),
    indent(2,  '<div />'),
    indent(1, ');'),
    indent(0, '}')
      
    ].filter(line => typeof line === 'string').join('\n');
    */

    export default createComp