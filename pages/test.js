let x = "padding: 0.5rem 1rem;\ndisplay: flex;\nalign-items: center;\nflex-direction: column;"



function parseCSSText(cssText) {
	const styleObj = {}
	
   cssText.split('\n').forEach( item => {
	   
		console.log(item.split(':'))
	   	let temp = item.split(':')
	   	styleValue = temp[1].replace(';','').trim()
	   
	   	styleProp = temp[0]
	   	console.log(typeof styleProp === "string")
	   	styleObj[styleProp] = styleValue
	})
	console.log(styleObj)
	console.log(JSON.parse(JSON.stringify(styleObj)))

  let res = JSON.parse(JSON.stringify(styleObj))
  return res
} 

parseCSSText(x)

let y = ' 0.5rem 1rem;'

console.log(y.replace(';', '').trim())