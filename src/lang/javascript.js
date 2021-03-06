const CodeDef = new Map();

CodeDef.set("constant-definition", [{title: "", code: 
`const i = 42`}]);

CodeDef.set("variable-definition", [{title: "", code: 
`var i = 42`},
{title: "javascript-variable-let", code: 
`let i = 42`}]);

CodeDef.set("for", [{title: "", code: 
`for (var i = 0; i < 10; i++) {
	
}`}]);

CodeDef.set("array-length", [{title: "", code: 
`arr.length`}]);

CodeDef.set("array-add", [{title: "", code: 
`arr.push(value)`}]);

CodeDef.set("array-remove", [{title: "", code: 
`arr.splice(index, 1)`},
{title: "", code:
"arr = arr.filter(item => item !== value)"}]);

CodeDef.set("array-includes", [{title: "", code: 
`arr.includes(value)`}]);

CodeDef.set("array-index-of", [{title: "", code: 
`arr.indexOf(value)`}]);

export default CodeDef