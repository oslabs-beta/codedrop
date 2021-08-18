import sample_data_layout from '../components/dnd/sample-layout-data';
import sample_data_comp from '../components/dnd/sample-component-data';
// const parse = require('json-to-ast');
import parse from 'json-to-ast';

const { layout } = sample_data_layout

console.log('layout ', layout)

const layoutStr = JSON.stringify(layout)

const settings = {
  // Appends location information. Default is <true>
  loc: true,
  // Appends source information to node’s location. Default is <null>
  // source: 'data.json'
};

const res = parse(layoutStr, settings);



const parseComponentsHelper = (compData) => {
  const { id , type } = compData
  console.log('Components elements ', sample_data_comp[id])
}

const parseComponents = (coms) => {
  console.log('components ', coms)

  for (let i = 0; i < coms.length; i ++) {
    console.log('Componenets ', coms[i])
    // if ()
    parseComponentsHelper(coms[i])
  }
}

const parseCols = (cols) => {
  console.log('cold ', cols)
  for(let i = 0; i < cols.length; i++){
    console.log('col ', cols[i])

    const col = cols[i]
    if (col.children.length !== 0 && Array.isArray(col.children)) {
      console.log('recursive cols')
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
  console.log('sample data ', sample_data_layout)
  
  let data ;

  for(var key in res) {
    console.log('res key' ,res.children)
    data = res[key]
  }

  return <h1>Hello!</h1>
}

export default HomeTest;