const CodeDef = new Map();

CodeDef.set('constant', [{title: "", code: 
`const i = 42`}]);

CodeDef.set('variable', [{title: "", code: 
`var i int = 42`},
{title: "", code: 
`i := 42`}]);

CodeDef.set('for', [{title: "", code: 
`for i := 0; i < 10; i++ {
	// some code
}`}]);

export default CodeDef