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
console.log(string_to_array("Robin Singh"))


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
function protect_email(email) {
    let [username, domain] = email.split('@');
    let hiddenUsername = username.slice(0, 3) + '...'; // Hide part of the username
    return hiddenUsername + '@' + domain;
}

console.log(protect_email("robin_singh@example.com"));  // Output: "rob...@example.com"



// Parameterize String
//Write a JavaScript function to parameterize a string.
function string_parametize(person){
    return person
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    

}
console.log(string_parametize("Robin Singh from USA"))

//8. Capitalize First Letter
// Write a JavaScript function to capitalize the first letter of a string.
function capitalize(letter){
   return letter
   .charAt(0)
   .toUpperCase()
   + letter.slice(1) 
   

}
console.log(capitalize("js string exercises"))

//9. Capitalize Each Word
//Write a JavaScript function to capitalize the first letter of each word in a string.
function capitalize_Words(words){
   return  words.replace(/\b\w/g, char => char.toUpperCase());
}
console.log(capitalize_Words("js string exercises"))


//Write a JavaScript function that converts uppercase letters to lowercase and vice
//versa
function swapcase(cases) {
    return cases.split("").map(char => 
        char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
    ).join("");
}

console.log(swapcase("AaBbc")); 


//11. Camelize String
// Write a JavaScript function to convert a string into camel case.
function camelize(str) {
    return str
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");
}


//12. Uncamelize String
//Write a JavaScript function to uncamelize a string.

console.log(camelize("JavaScript Exercises")); 

function uncamelize(str, separator = " ") {
    return str.replace(/[A-Z]/g, match => separator + match.toLowerCase());
}

console.log(uncamelize('helloWorld','-'));    

//13. Repeat String
// Write a JavaScript function to concatenate a given string n times.
function repeat(str, n) {
    return str.repeat(n);
}

console.log(repeat('Ha!', 3))


// 14. Insert in String
//  Write a JavaScript function to insert a string within another string at a given
// position.
function insert(mainStr, insertStr, position) {
    return mainStr.slice(0, position) + insertStr + mainStr.slice(position);
}

console.log(insert('We are doing some exercises.', 'JavaScript ', 18));

// 15. Humanize Format
//  Write a JavaScript function that formats a number with the correct suffix (1st,
// 2nd, etc.).
function humanizeNumber(num) {
    if (num % 100 >= 11 && num % 100 <= 13) {
        return num + "th"; // Handle special cases like 11th, 12th, 13th
    }

    let lastDigit = num % 10;
    let suffix = (lastDigit === 1) ? "st" :
                 (lastDigit === 2) ? "nd" :
                 (lastDigit === 3) ? "rd" : "th";

    return num + suffix;
}

console.log(humanizeNumber(301)); 


// 16. Truncate String with Ellipsis
// Write a JavaScript function to truncate a string and append "..."
function text_truncate(str, length, ellipsis = '...') {
    if (str.length > length) {
        return str.slice(0, length) + ellipsis;
    }
    return str;
}

console.log(text_truncate('We are doing JS string exercises.', 15, '!!'));

// 17. Chop String into Chunks
//  Write a JavaScript function to chop a string into chunks
function string_chop(str, size) {
    let chunks = [];
    for (let i = 0; i < str.length; i += size) {
        chunks.push(str.slice(i, i + size));
    }
    return chunks;
}

console.log(string_chop('w3resource', 3)); 

// 18. Count Substring Occurrences
//  Write a JavaScript function to count occurrences of a substring in a string.

function count(str, substring) {
    let regex = new RegExp(substring, 'gi'); // 'g' for global search, 'i' for case-insensitive
    let matches = str.match(regex);
    return matches ? matches.length : 0;
}

console.log(count("The quick brown fox jumps over the lazy dog", 'the'));  // Output: 2

// 19. Reverse Binary Representation
// Write a JavaScript function that reverses the binary representation of a number
// and returns its decimal form.

function reverse_binary(num) {
    // Convert the number to binary
    let binary = num.toString(2);
    
    // Reverse the binary string
    let reversedBinary = binary.split('').reverse().join('');
    
    // Convert the reversed binary back to decimal
    return parseInt(reversedBinary, 2);
}

console.log(reverse_binary(100)); // Output: 19


// 20. Pad String to Length
// Write a JavaScript function to pad a string to a specified length.
function formatted_string(pad, num, position) {
    let str = num.toString(); // Convert the number to a string
    let paddingLength = pad.length - str.length; // Calculate the required padding length

    if (paddingLength > 0) {
        if (position === 'l') {
            // Pad the string to the left
            return pad.slice(0, paddingLength) + str;
        } else if (position === 'r') {
            // Pad the string to the right
            return str + pad.slice(0, paddingLength);
        }
    }

    return str; // Return the original string if no padding is needed
}

console.log(formatted_string('0000', 123, 'l'));  // Output: "0123"
