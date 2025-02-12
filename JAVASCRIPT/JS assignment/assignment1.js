//1. Check if a String is a Palindrome
//Write a function to determine if a given string is a palindrome. A palindrome is a string that reads the same forward and backward (ignoring spaces, punctuation, and case).
function isPalindrome(str) {
    let str2 = str.replace(/\s+/g, ''); // Removes whitespace

    // Remove non-alphanumeric characters
    const str3 = str2.split('').filter(char => /[a-zA-Z0-9]/.test(char)).join('');

    // Convert to lowercase, reverse, and compare
    const str1 = str3.toLowerCase().split('').reverse().join('');

    return str1 === str3.toLowerCase();
}


console.log(isPalindrome("A man, a plan, a canal, Panama"))
console.log(isPalindrome("Was it a car or a cat  I saw?"))
console.log(isPalindrome("Hello, World"))

// 2. Reverse a String
// Write a function to reverse a given string.
function reverseString(str){
        return str.split('').reverse().join('')
}
console.log(reverseString("Loyce"))


// 3. Find the Longest Palindromic Substring
// Write a function to find the longest palindromic substring in a given string.
function longestPalindromicSubstring(s) { 
    const s1=s.split("")
    const s2=s.split("").reverse()
    let arr=[]
    for(let i=0; i < s1.length; i++){
        if(s1[i]==s2[i]){
            arr.push(s1[i])
        }
        else{
            continue
        }
       
    }
    return arr.join("")
} 
    // Test Cases 
    console.log(longestPalindromicSubstring('babad')); 
    console.log(longestPalindromicSubstring('cbbd')); 
   


// 4. Check if Two Strings are Anagrams
// Write a function to check if two given strings are anagrams of each other. Two strings are anagrams if they contain the same characters in the same frequency but in different orders.

function areAnagram(str1, str2) {
    let newStr1 = str1.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
    let newStr2 = str2.toLowerCase().replace(/[^a-z]/g, '').split('').sort().join('');
    return newStr1 === newStr2;
}
console.log(areAnagram("Listen","Silent"))
console.log(areAnagram("Hello","World"))



// 5. Remove Duplicates from a String
//Write a function to remove duplicate characters from a string while preserving the order of the first appearance of each character.
function removeDuplicates(str) {
    let seen = new Set();
    return str
        .split('')
        .filter(function(char) {
            if (!seen.has(char)) {    //checks for characters that were not seen before
                seen.add(char);      // and adds them
                return true;
            }
            return false;
        })
        .join('');
}

console.log(removeDuplicates("programming")); 
console.log(removeDuplicates("hello world"));
console.log(removeDuplicates("aaaaa"));
console.log(removeDuplicates("abcd"));
console.log(removeDuplicates("aabbcc"));


//6. Count Palindromes in a String
//Write a function to count how many distinct palindromes are in a given string. A palindrome is considered distinct based on its start and end position in the string.
function countPalindromes(str) {
    let uniquePalindromes = new Set();

    // Generate all possible substrings
    for (let i = 0; i < str.length; i++) {
        for (let j = i; j < str.length; j++) {
            let substring = str.substring(i, j + 1);
            if (arePalindrome(substring)) {
                uniquePalindromes.add(substring); // Store unique palindromes
            }
        }
    }

    return uniquePalindromes.size; // Count of distinct palindromes
}

// Function to check if a string is a palindrome
function arePalindrome(s) {
    return s === s.split('').reverse().join('');
}

// Test Cases
console.log(countPalindromes("ababa")); 
console.log(countPalindromes("racecar")); 
console.log(countPalindromes("aabb")); 
console.log(countPalindromes("a")); 
console.log(countPalindromes("abc")); 



// 7. Longest Common Prefix
// Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.

function longestCommonPrefix(strs) {
    if (strs.length === 0) return "";

    let prefix = strs[0];  // Start with the first string as the prefix

    for (let i = 1; i < strs.length; i++) {
        
        while (strs[i].indexOf(prefix) !== 0) {    // Compare the current string with the prefix
            
            prefix = prefix.substring(0, prefix.length - 1);  // Trim the prefix from the end one character at a time
            if (prefix === "") return "";  // No common prefix
        }
    }

    return prefix;  // Return the longest common prefix
}

// Test Cases
console.log(longestCommonPrefix(["flower", "flow", "flight"]));  // Output: "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"]));     // Output: ""
console.log(longestCommonPrefix(["interspecies", "interstellar", "interstate"]));  // Output: "inter"


// 8. Case Insensitive Palindrome
// Modify the palindrome function to be case insensitive, meaning it should ignore upper and lower case differences when checking for a palindrome.
function is_Palindrome(str) {
    let str2 = str.replace(/\s+/g, ''); // Removes whitespace

    // Remove non-alphanumeric characters
    const str3 = str2.split('').filter(char => /[a-zA-Z0-9]/.test(char)).join('');

    // Convert to lowercase, reverse, and compare
    const str1 = str3.toLowerCase().split('').reverse().join('');

    return str1 === str3.toLowerCase();
}

// Test Cases
console.log(is_Palindrome("Aba")); 
console.log(is_Palindrome("Racecar")); 
console.log(is_Palindrome("Palindrome"));
console.log(is_Palindrome("Madam"));  
console.log(is_Palindrome("Hello"));               
