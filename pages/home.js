import sample_data_layout from '../components/dnd/sample-layout-data';
import sample_data_comp from '../components/dnd/sample-component-data';

import eleFactory from '../generate/createHTMLElements';

console.log('eleFactory ', eleFactory)

const { layout } = sample_data_layout

console.log('layout ', layout)


let res;

const parseComponentsHelper = (compData) => {
  const { id , type } = compData
  console.log('parseComponentsHelper ', sample_data_comp[id])
  res = eleFactory.createElement(sample_data_comp[id])

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

  parseCols(layout[0].children)
  

}



const HomeTest = () => {
  console.log('elemtn ', res)
  // https://gomakethings.com/converting-a-string-into-markup-with-vanilla-js/
  // native browser method
  // var parser = new DOMParser();

  // const body = parser.parseFromString(res.div, 'text/html')
  // // let data ;
  // const img = body.images[0]
  // console.log(img)

  return ( 
    <>
    <h1>Hello!</h1>
    
    </>
  )
}

export default HomeTest;