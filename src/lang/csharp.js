const CodeDef = new Map();

CodeDef.set("constant", [{title: "", code: 
`const int i = 42;`}]);

CodeDef.set("variable", [{title: "", code: 
`int i = 42;`}]);

CodeDef.set("for", [{title: "", code: 
`for (int i = 0; i < 10; i++)
{
	// some code
}`}]);

CodeDef.set("array-size", [{title: "", code: 
`arr.Length`}]);

export default CodeDef