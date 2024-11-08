// buttons
const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const clearBtn = document.getElementById("clear-btn");
const result = document.getElementById("results-div");
const form = document.getElementById("validation-space");

// variables
const validRegex = /^\+?1?\s?(\(?[\d]{3}\)?[\s|-]?){2}\(?[\d]{4}\)?$/;

//functions
const validateNumber = () => {
    const phoneNumber = userInput.value.trim();
    const validText = `\nValid US number: ${phoneNumber}\n`;
    const invalidText = `\nInvalid US number: ${phoneNumber}\n`;

    if (phoneNumber === "") {
        alert("Please provide a phone number");
    } else if (/^(\(\d{3}|\d{3}\))-\d{3}-\d{4}$/.test(phoneNumber)) {
        result.innerText = invalidText + result.innerText;
    } else if (/^\(\d+\)$/.test(phoneNumber)) {
        result.innerText = invalidText + result.innerText;
    } else if (/^1\s\d{3}\)\d{3}-\d{4}$/.test(phoneNumber)) {
        result.innerText = invalidText + result.innerText;
    } else {
        let text = validRegex.test(phoneNumber) ? validText : invalidText;
        result.innerText = text + result.innerText;
    }

    userInput.value = "";
}

clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
    result.innerText = "";
    userInput.value = "";
})

checkBtn.addEventListener("click", (e) => {
    e.preventDefault();
    validateNumber();
})

window.onload = () => {
    form.reset();
}