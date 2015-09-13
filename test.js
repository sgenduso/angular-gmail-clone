// Given the following, fill in the function so it detects if a string has duplicate letters.
// It should be case insensitive.

var str1 = "supercalifragilisticexpialidocious";
var str2 = "ABab";
var str3 = "a";
var str4 = "abcDeFg";

function hasDupes(str) {
  var letters = str.toLowerCase().split('');
  for (var i = 0; i < letters.length; i++) {
    if (str.slice(i+1).toLowerCase().match(letters[i])) {
      return true;
    }
  }
  return false;
}

console.log(hasDupes(str1)); // => true
console.log(hasDupes(str2)); // => true
console.log(hasDupes(str3)); // => false
console.log(hasDupes(str4)); // => false
