const CodeDef = new Map();

CodeDef.set("constant", [{title: "", code: 
`const i = 42`}]);

CodeDef.set("variable", [{title: "", code: 
`var i int = 42`},
{title: "", code: 
`var i int
i = 42`},
{title: "", code: 
`i := 42`},
{title: "", code: 
`var i, j int = 1, 2`},
{title: "", code: 
`var i, j, s = 1, 2, "Hello"`},
{title: "", code: 
`i, j, s := 1, 2, "Hello"`}]);

CodeDef.set("type-conversion", [{title: "", code: 
`var f float64 = float64(intValue)`},
{title: "", code: 
`f := float64(intValue)`}]);

CodeDef.set("if", [{title: "", code: 
`if x < 0 {
	
}`},
{title: "", code: 
`if v := math.Pow(x, n); v < lim {
	return v
}`}]);

CodeDef.set("if-else", [{title: "", code: 
`if x < 0 {
	
} else {
	
}`},
{title: "", code: 
`if x == 0 {
	
} else if x < 0 {
	
} else {
	
}`}]);

CodeDef.set("switch", [{title: "", code: 
`switch x {
case 1:
	
case 2:
	
default:
	
}`}]);

CodeDef.set("switch-fallthrough", [{title: "", code: 
`switch x {
case 1:
	
	fallthrough
case 2:
	
default:
	
}`}]);

CodeDef.set("for", [{title: "", code: 
`for i := 0; i < 10; i++ {
	
}`},
{title: "", code: 
`for ; sum < 1000; {
	sum += sum
}`}]);

CodeDef.set("while", [{title: "", code: 
`for sum < 1000 {
	sum += sum
}`}]);

CodeDef.set("infinite-loop", [{title: "", code: 
`for {

}`}]);

CodeDef.set("bitwise-xor", [{title: "", code: 
`i := 2 ^ 3`}]);

CodeDef.set("array-length", [{title: "", code: 
`len(arr)`}]);

CodeDef.set("console-import", [{title: "", code: 
`import "fmt"`}]);

CodeDef.set("console-output", [{title: "", code: 
`fmt.Println("Hello")`}]);

CodeDef.set("simple-function", [{title: "", code: 
`func sayHello() {
	fmt.Println("Hello")
}`}]);

CodeDef.set("function-with-arguments", [{title: "", code: 
`func add(x, y int) int {
	return x + y
}`},
{title: "go-function-multiple-return", code: 
`func swap(x, y string) (string, string) {
	return y, x
}`},
{title: "go-function-named-return", code: 
`func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}`}]);

CodeDef.set("function-call", [{title: "", code: 
`sayHello()`},
{title: "", code: 
`z := add(42, 13)`},
{title: "", code: 
`a, b := swap("hello", "world")`}]);

CodeDef.set("deferred-call", [{title: "The deferred call's arguments are evaluated immediately, but the function call is not executed until the surrounding function returns.", code: 
`defer sayHello()`}]);

CodeDef.set("module-declaration", [{title: "", code: 
`package main`}]);

CodeDef.set("module-import", [{title: "", code: 
`import "fmt"`},
{title: "", code: 
`import (
	"fmt"
	"math/rand"
)`}]);

CodeDef.set("hello-world-console", [{title: "", code: 
`package main

import "fmt"

func main() {
	fmt.Println("Hello, World!")
}`}]);

export default CodeDef