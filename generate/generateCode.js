const indent = (index, str) => {
  return str && '\t'.repeat(index) + str;
}

const ostr = (condition, string) => {
  return condition ? string : null
}

export const createComp = () => {

  return [
    indent(0, ostr(true, "import React from 'react';")),
    indent(0, 'export const samplePro = () => {'),
    indent(1, 'return ('),
    indent(2,  '<div />'),
    indent(1, ');'),
    indent(0, '}')
      
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