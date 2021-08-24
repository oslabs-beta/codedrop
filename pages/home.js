// import sample_data_layout from '../components/dnd/sample-layout-data';
// import components from '../components/dnd/sample-component-data';
import { prettierCode } from '../components/api/prettierCode'
import eleFactory from '../generate/createHTMLElements';
import { useEffect, useState } from 'react';
import Container from '../pages/project/[projectId]'
import createComp from '../generate/generateCode'
const prettier = require("prettier");
console.log('eleFactory ', eleFactory)

// const { layout } = sample_data_layout



let str = `import React from 'react';
export const samplePro = () => {
    return (
        <div />
    );
}`

let components;
let layout;
let res = []
// prettierCode(str)

const parseComponentsHelper = (compData) => {
  const { id , type } = compData
  console.log('parseComponentsHelper ', components[id])
  res.push(eleFactory.createElement(components[id]).div)

  console.log('eleFactory result ', res)
}

const parseComponents = (coms) => {
  console.log('parseComponents ', coms)

  for (let i = 0; i < coms.length; i ++) {
    console.log('calling parseComponentsHelper ')
    parseComponentsHelper(coms[i])
  }
}

const parseCols = (cols) => {
  console.log('cols ', cols)
  for(let i = 0; i < cols.length; i++){
    console.log('col ', cols[i])

    const col = cols[i]
    if (col.children.length !== 0 && Array.isArray(col.children)) {
      console.log('calling parseComponents')
      // parseCols(col.children)
      parseComponents(col.children)
    }
    
  }
}


if (Array.isArray(layout) && layout[0].children.length !== 0) {
  console.log('child found')
  // console.log('ENV ', process.env)

  parseCols(layout[0].children)
  

}

// createComp(res.div)
console.log('result ', res)
console.log('generatedCode ', createComp(res))

const generatedCodeStr = createComp(res)

// console.log(prettierCode(generatedCodeStr))
// console.log(prettier.format("foo ( );", { semi: false, parser: "babel" }));

// const generatedCode = prettier.format(`import React from 'react';`, { semi: false, parser: "babel"})



const HomeTest = () => {
  // console.log('elemtn ', res)
  // https://gomakethings.com/converting-a-string-into-markup-with-vanilla-js/
  // native browser method
  // var parser = new DOMParser();

  // const body = parser.parseFromString(res.div, 'text/html')
  // // let data ;
  // const img = body.images[0]
  const [codeString, setCodeString] = useState(``);

  // console.log(img)
  useEffect( () => {
    prettierCode(generatedCodeStr, setCodeString)
  },[])

  console.log('codeString ', codeString)
  return ( 
    <>
    <h1>Hello!</h1>
    </>
  )
}

export default HomeTest;

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
export const generateCode = async (input='') => {
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
export const getData = (layout, components) => {
  console.log('layout ', layout)
  console.log('components ', components)
  components = components
  layout = layout
}