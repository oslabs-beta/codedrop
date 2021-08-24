import { prettierCode } from '../components/api/prettierCode'
import eleFactory from '../generate/createHTMLElements';
import createComp from '../generate/generateCode'


let components;
let layout;
let res = []

console.log('result </div> ', res)

const parseComponentsHelper = (compData, components) => {
  const { id , type } = compData
  console.log(id)
  // if(components[id]) {
  //   console.log('parseComponentsHelper ', components[id])
  //   res.push(eleFactory.createElement(components[id]).div)
  // }
  for(let i = 0; i < components.length; i ++) {
    let tempComponent = components[i]

    if (tempComponent[id]) {
      console.log('parseComponentsHelper ', components[id])
      res.push(eleFactory.createElement(components[id]).div)
    }
  }

  console.log('eleFactory result ', res)
}

const parseComponents = (coms, components) => {
  console.log('parseComponents ', coms)

  for (let i = 0; i < coms.length; i ++) {
    console.log('calling parseComponentsHelper ')
    parseComponentsHelper(coms[i], components)
  }
}

const parseCols = (cols, components) => {
  components = components
  console.log('cols ', cols)
  for(let i = 0; i < cols.length; i++){
    console.log('col ', cols[i])

    const col = cols[i]
    if (col.children.length !== 0 && Array.isArray(col.children)) {
      console.log('calling parseComponents')
      // parseCols(col.children)
      parseComponents(col.children, components)
    }
    
  }
}

const runFactory = ({ layout, components }) => {

  if (Array.isArray(layout) && layout[0].children.length !== 0) {
    console.log('child found')
    parseCols(layout[0].children)
  }
}

// createComp(res.div)
console.log('result ', res)
console.log('generatedCode ', createComp(res))

const generatedCodeStr = createComp(res)

// console.log(prettierCode(generatedCodeStr))
// console.log(prettier.format("foo ( );", { semi: false, parser: "babel" }));

// const generatedCode = prettier.format(`import React from 'react';`, { semi: false, parser: "babel"})


export const generateFormattedCode = (formattedCode='') => {
  const read = () => formattedCode
  const write = (generatedCode) => {
    // console.log('generateFormattedCode ', generatedCode)
    formattedCode = generatedCode
    console.log('generateFormattedCode ', formattedCode)
    return formattedCode
  }

  return [read, write]
}

/**
 * @param {String} input 
 */
const generateCode = async (input='') => {
  console.log('called generateCode ')
  const [read, write] = generateFormattedCode('')
  console.log('read () ', read)
  let x = read()
  try {
    x = await prettierCode(generatedCodeStr, write)
  } catch(err) {
    console.error(`request did not complete ${err}`)
  }

  console.log('read () ', x)
  return read()
}

/**
 * @param {Array} layout 
 * @param {Object} components 
 */
export const genearteAndReturnFormattedCode = (layout, components) => {
  console.log('layout ', layout)
  console.log('components ', components)
  // components = components
  // layout = layout
  
  if (Array.isArray(layout) && layout[0].children.length !== 0) {
    console.log('child found')
    parseCols(layout[0].children, components)
  }
}