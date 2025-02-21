//object
let student = {
    firstName:"John Doe",
    lastName:"Tucker",
    regNo:"C026",
    department:"Computer Science",
    isActive: true,
}

//converting to json
let jsonValue = JSON.stringify(student)
console.log(jsonValue)

// jsonValue = JSON.stringify(student,null ,2)
// console.log(jsonValue)

// ///convert a value to an object
// let newStudent = JSON.parse(jsonValue)
// console.log(newEmployee)

// //writing JSON directly
// let jsonString = `{
// "firstName":"Elizabeth",
// "lastName":"Jones"
// }`
// let obj = JSON.parse(jsonString)
// console.log(obj)

// //Improperly formatted JSON 
// let notJSON = "hello"
// let newObj = JSON.parse(notJSON)
