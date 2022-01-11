const CodeDef = new Map();

CodeDef.set("constant", [{title: "", code: 
`const int i = 42;`}]);

CodeDef.set("variable", [{title: "", code: 
`int i = 42;`}]);

CodeDef.set("for", [{title: "", code: 
`for (int i = 0; i < 10; i++)
{
	
}`}]);

CodeDef.set("array-length", [{title: "", code: 
`arr.Length`}]);

export default CodeDef