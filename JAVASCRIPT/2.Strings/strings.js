// 1. Check String Input
// Write a JavaScript function to check whether an 'input' is a string or not.
function is_string(str){
   
 return typeof str == "string"
}
console.log(is_string('w3resource'))
console.log(is_string([1,2,4,0]))

// 2. Check Blank String
//  Write a JavaScript function to check whether a string is blank or not.
function is_Blank(value){
    if(value ===''){
        return true;
    }
    else {
        return false;}

}

console.log(is_Blank(""))
console.log(is_Blank('abc'))


// 3. String to Array of Words
// Write a JavaScript function to split a string and convert it into an array of words.
function string_to_array(arr){
    return arr.split(" ")
}
console.log(string_to_array("Loyce Mapenzi"))

// 4. Extract Characters
 //Write a JavaScript function to extract a specified number of characters from a
//string.
  function truncate_string(word,len){
    return word.substr(0,len)

  }
console.log(truncate_string("Robin Singh",4))

//5. Abbreviate Name
//Write a JavaScript function to convert a string into abbreviated form.
function abbrev_name(name,value){
    return name.substr(0,7)
}
console.log(abbrev_name("Robin Singh"))

//6. Hide Email Address
// Write a JavaScript function that hides email addresses to prevent unauthorized
//access.


// Parameterize String
//Write a JavaScript function to parameterize a string.



  