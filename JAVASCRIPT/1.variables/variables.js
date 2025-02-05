
//1. Declare a variable age using let and assign it the value 25.
let age = 25;

//2. Declare a variable schoolName using const and assign it "Greenwood High".
const schoolName = "Greenwood High";

//3. Declare an empty array called studentsList.
 let studentsList = [];

//4. What is the difference between let, const, and var when declaring variables?
//Let can be reassigned later ,cannot be redeclared and allows blockscope
//Const can not be reassigned once declared,cannot be redeclared and allows blockscope
//var can be reassigned , redeclared and allows global scope

//2. Naming Conventions
//4.Which of the following variable names is invalid?
//let 1stPlace = "John";//variable name cannot start with a number

//5.Why is the following variable name incorrect?
//const #taxRate = 0.16;
//the variable name is incorrect because it starts with a #

//6.Rewrite this variable name to follow best practices:
//let MyvariableNAME = "JavaScript";
let myVariableName = "JavaScript";

//3. Identifying Data Types
//What will be the output of the following?
console.log(typeof "Hello");//string
console.log(typeof 99);//number
console.log(typeof true);//boolean
console.log(typeof undefined);//null

//Identify the data types in this array:
let data = ["Kenya", 34, false, { country: "USA" }, null]
//kenya - string;
//34 - number;
//false - boolean;
//{country: "USA"} - Object;
//null - undefined ;

//9. How do you define a BigInt in JavaScript? Provide an example.
//To define a BigInt, we append n to the end of an integer or call BigInt()
// example
let kenyaDebt = 1000000000000000n;
let cash = BigInt(12000000000);

//4. Objects & Arrays
//11. Create an object person with properties name, age, and city.
let person = {name:"John Doe", age:65, city:"Monrovia"};

//12. Add a new property email to the person object.
person.email = "john@yahoo.com";

//13. Declare an array fruits with three fruit names.
let fruits = ["watermellon","pineapple","mango"];

//14. Access the second item in the fruits array
console.log(fruits[1])

//5. Type Coercion
//15. What will be the output of the following?
console.log("5" + 2); -//52
console.log("5" - 2);//3

//16. Convert the string "100" into a number.
let num1 = typeof(parseInt(100));
console.log(num1)
//17. Convert the number 50 into a string.
let num =typeof(toString(50)) ;
console.log(num);

//18. What will be the result of this operation?
console.log(5 + true)//6