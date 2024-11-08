const checkButton = document.getElementById("check-btn");
const result = document.getElementById("result");

//Algo:
// step-1: make the string lowercase
// step-2: clean up the string
//step: check if string is empty => "Please input a value"
//step : check if string size == 1 => then palindrome
// step-3: split the string up into individual letters
// step-4: reverse the order of the letters
// step-5: compare reversed string with the original string

function isPalindrome(str) {
    
    const splittedStr = str.split("");
    const reversedSplittedStr = splittedStr.reverse();
    const reversedStr = reversedSplittedStr.join("");

    return str === reversedStr;
}

function isPalindromeColors() {
document.documentElement.style.setProperty('--main-background-image', 'url(https://previews.123rf.com/images/siamimages/siamimages1706/siamimages170600166/79498298-pattern-background-check-mark-icon-wrong-and-right.jpg)');
document.documentElement.style.setProperty('--main-background-color', '#0a0a23');
document.documentElement.style.setProperty('--cont-background-color', 'rgb(202, 246, 202)');
document.documentElement.style.setProperty('--heading-font-color', '#3C7038');
document.documentElement.style.setProperty('--hero-background-color', '#0f3815');
  document.documentElement.style.setProperty('--hero-box-shadow', 'rgba(15, 56, 21, 0.2)');
  document.documentElement.style.setProperty('--text-input-font-color', '#0a0a0a');
document.documentElement.style.setProperty('--text-input-color', '#dcdcdc');
document.documentElement.style.setProperty('--text-input-bottom', '#28a745');
document.documentElement.style.setProperty('--check-btn-background-color', '#28a745');
document.documentElement.style.setProperty('--check-btn-border-color', '#28a745');
document.documentElement.style.setProperty('--result-text-color', '#28a745');
document.documentElement.style.setProperty('--legend-background-color', '#0f3815');
document.documentElement.style.setProperty('--legend-font-color', '#fff');
}

function isNotPalindromeColors() {
    document.documentElement.style.setProperty('--main-background-image', 'url(https://image.similarpng.com/very-thumbnail/2020/11/InCorrect-icon-in-sticker-style-on-transparent-background-PNG.png)');
    document.documentElement.style.setProperty('--cont-background-color', 'rgb(240, 148, 148)'); 
    document.documentElement.style.setProperty('--heading-font-color', '#3B3B3B');
    document.documentElement.style.setProperty('--hero-background-color', '#380f15');
    document.documentElement.style.setProperty('--hero-box-shadow', 'rgba(56, 15, 21, 0.2)');
    document.documentElement.style.setProperty('--text-input-font-color', '#0a0a0a');
    document.documentElement.style.setProperty('--text-input-color', '#dcdcdc');
    document.documentElement.style.setProperty('--text-input-bottom', '#dc3545');
    document.documentElement.style.setProperty('--check-btn-background-color', '#dc3545');
    document.documentElement.style.setProperty('--check-btn-border-color', '#dc3545');
    document.documentElement.style.setProperty('--result-text-color', '#dc3545');
    document.documentElement.style.setProperty('--legend-background-color', '#555');
    document.documentElement.style.setProperty('--legend-font-color', '#fff');
  
  }

checkButton.addEventListener("click", () => {
    const textInput = document.getElementById("text-input").value;
    document.getElementById("text-input").value = "";

    if(textInput.length === 0 || !textInput){
        alert("Please input a value");
        return;
    }
    const loweredStr = textInput.toLowerCase();
    const regex = /[\W_]/g;
    const cleanedUpStr = loweredStr.replace(regex, "");

    if(cleanedUpStr.length === 1 || isPalindrome(cleanedUpStr)) {
        isPalindromeColors();
        result.textContent = `${textInput} is a palindrome`;
    } else if(isPalindrome(cleanedUpStr) === false) {
        isNotPalindromeColors();
        result.textContent = `${textInput} is not a palindrome`;
    }

})
