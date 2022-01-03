const CodeDef = new Map();

CodeDef.set('constant', [{title: "", code: 
`const i = 42`}]);

CodeDef.set('variable', [{title: "", code: 
`var i = 42`},
{title: "С блочной областью видимости:", code: 
`let i = 42`}]);

CodeDef.set('for', [{title: "", code: 
`for (var i = 0; i < 10; i++) {
	// some code
}`}]);

export default CodeDef