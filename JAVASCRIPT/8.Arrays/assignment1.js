// Question 1: How do you create an empty array in JavaScript?
const marks = [] // by use of literals
const students = new Array() //using array constructor

// Question 2: How do you access the first and last elements of an array
const arr = [23,24,45,56]
console.log(arr[0])        //referencing using index 0 for first element
console.log(arr[arr.length-1]) //referencing using index (length - 1) for last element

// Question 3: How do you add an element to the end of an array?
// we use the push method
arr.push(47)
console.log(arr)

//Question 4: How do you remove the last element from an array?

console.log(arr.pop())

// Question 5: How do you loop through an array in JavaScript?
const arr1 = [23,24,45,56]
 for(let i=0 ; i<arr1.length; i++){    // using for of loop
  console.log(arr1[i])
 }

 let arr2 =[43,80,99,50]
   arr2.forEach((num)=>{          // using forEach
    console.log(num)
   })
   

//    Question 6: How do you check if an element exists in an array?
// Answer: You can check if an element exists in an array using the indexOf() method. If the element is
// not found, indexOf() returns -1. For example:
const arr3 = ["code","rest","sleep"]
console.log((arr3.indexOf("rest")))
console.log((arr3.indexOf("play")))


//alternative
let arr4 = [1, 2, 3];
if (arr4.indexOf(2) !== -1) {
console.log('Element found');
} else {
console.log('Element not found');
}

//Question 7: How do you remove an element from an array at a specific inde
// You can remove an element from an array at a specific index using the splice() method. F
//example, to remove the element at index 2:
let arr5 = [56, 65, 77, 66]
  arr5.splice(1,65)

  // Question 8: How do you concatenate two arrays in JavaScript?
  // Answer: You can concatenate two arrays using the concat() method.
let arr6= [1, 2];
let arr7 = [3,2, 4];
let newArr = arr6.concat(arr7);
console.log(newArr); 


// Question 1: Write a function to flatten a nested array in JavaScript.

function flattenArray(arr) {
return arr.reduce(function(flat, toFlatten) {
return flat.concat(Array.isArray(toFlatten) ? flattenArray(toFlatten) : toFlatten);
}, []);
}

// Question 2: What does the reduce() method do in the flattenArray() function above?
// Answer: The reduce() method in JavaScript takes an array and applies a function to each element,
// accumulating the result into a single value. In the flattenArray() function above, the reduce() method
// is used to concatenate the current element (either a flattened sub-array or a non-array value) to the
// flattened array so far.


// Question 3: Can you give an example of a nested array that the flattenArray()
// function would be able to flatten?

var nestedArray = [1, [2, [3, 4], 5], 6];
flattenArray(nestedArray); // returns [1, 2, 3, 4, 5, 6]


//Question 4: Can you explain how the flat() method can be used to flatten an array in
// JavaScript?
// Answer: The flat() method is a built-in method in JavaScript that can be used to flatten an array. It
// takes a depth parameter, which specifies how many levels of nested arrays should be flattened. If no
// depth parameter is provided, it defaults to 1. 
var nestedArray = [1, [2, [3, 4], 5], 6];
nestedArray.flat(2); // returns [1, 2, 3, 4, 5, 6]



// Question 5: What are some potential issues to watch out for when flattening arrays
// in JavaScript?
// Answer: One potential issue to watch out for is the risk of creating a very large flattened array, which
// could lead to performance issues or memory errors. Another issue to be aware of is the possibility of
// circular references in nested arrays, which could cause infinite recursion if not handled properly.
// Finally, different flattening methods (e.g. using reduce() vs. using flat()) may have different
// performance characteristics, so it's important to choose the method that's most appropriate for your
// use case.



// Question 1: What is the difference between .map() and .forEach()?
// Answer:
// .map() and .forEach() are both array methods that allow you to loop through an array, but they differ
// in what they return.
// ○ .map() returns a new array with the same length as the original array, where each
// element is the result of applying a callback function to the original element.
// ○ .forEach() does not return anything, but it simply executes a callback function on each
// element of the array.

const numbers = [1, 2, 3, 4, 5];
const doubledNumbers = numbers.map(num => num * 2);
console.log(doubledNumbers); // [2, 4, 6, 8, 10]
numbers.forEach(num => console.log(num * 2)); // 2, 4, 6, 8, 10


// Question 2: How do you remove an element from an array in JavaScript?
// Answer: You can remove an element from an array using the .splice() method. This method modifies
// the original array by removing or replacing existing elements and/or adding new elements.

const fruits = ['apple', 'banana', 'orange', 'mango'];
// remove 'orange'
fruits.splice(2, 1);
console.log(fruits); // ['apple', 'banana', 'mango']
// In this example, we use the .splice() method to remove the third element (index 2) in the fruits array.


// Question 4: How do you sort an array in JavaScript?
// Answer: You can sort an array using the .sort() method. This method modifies the original array by
// sorting its elements in place.

const fruit = ['banana', 'apple', 'orange', 'mango'];
fruits.sort();
console.log(fruit); // ['apple', 'banana', 'mango', 'orange']
// In this example, we use the .sort() method to sort the fruits array in alphabetical order.


// Question 5: How do you flatten a nested array in JavaScript?
// You can flatten a nested array (i.e. an array that contains other arrays as elements) using the .flat()
// method. This method returns a new array with all sub-array elements concatenated into it recursively
// up to the specified depth.
const number = [1, 2, [3, 4], [5, [6, 7]]];
const flattenedNumbers = numbers.flat(2);
console.log(flattenedNumbers); // [1, 2, 3, 4,

// How to get first 3 elements of array in JavaScript?
// To get the first three elements of an array in JavaScript, you can use the slice() method with a
// starting index of 0 and an ending index of 3. For example, to get the first three numbers from an
// array of numbers, you can write: let firstThreeNumbers = numbers.slice(0, 3);
// What is Array[-1] in JavaScript?
// Array[-1] in JavaScript will return the last element of the array, since negative index values count
// backwards from the end of the array. So, for example, if you have an array of numbers, you can
// access the last element using array[-1]