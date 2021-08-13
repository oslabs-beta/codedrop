import sample_data from '../components/dnd/sample-layout-data';
// const parse = require('json-to-ast');
import parse from 'json-to-ast';

const { layout } = sample_data

console.log('layout ', layout)

const layoutStr = JSON.stringify(layout)

console.log('layoutStr ', layoutStr)

const settings = {
  // Appends location information. Default is <true>
  loc: true,
  // Appends source information to node’s location. Default is <null>
  // source: 'data.json'
};

const res = parse(layoutStr, settings);

console.log('res.childres ', res.children[0])
console.log('res.keys ', Object.keys(res))

const keys = Object.keys(res)

// for (let key in res) {
//   if(Array.isArray(res[key])) console.log('child found ')
// }

if (res.children.length !== 0) console.log('child found')


const HomeTest = () => {
  console.log('sample data ', sample_data)
  
  let data ;

  for(var key in res) {
    console.log('res key' ,res.children)
    data = res[key]
  }

  return <h1>Hello!</h1>
}

export default HomeTest;