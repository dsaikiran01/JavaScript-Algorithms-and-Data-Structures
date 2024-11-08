const inputBtn = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const outputBtn = document.getElementById("output");

const numerals = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1
};

const processNumeral = (result, symbol, symbolValue) => {
    while (result.value >= symbolValue) {
        result.numeral += symbol;
        result.value -= symbolValue;
        console.log("in while - numeral is: ", result.numeral);
    }
}

const convertToRomanNumeral = () => {
    outputBtn.classList.remove("hidden");

    if (!inputBtn.value) {
        outputBtn.classList.add("changeForAlert");
        outputBtn.textContent = "Please enter a valid number";
        return;
    }
    const inputBtnNum = Number(inputBtn.value);
    if (inputBtnNum <= 0) {
        outputBtn.classList.add("changeForAlert");
        outputBtn.textContent = "Please enter a number greater than or equal to 1";
    } else if (inputBtnNum >= 4000) {
        outputBtn.classList.add("changeForAlert");
        outputBtn.textContent = "Please enter a number less than or equal to 3999";
    } else {

        let result = {
            value: inputBtnNum,
            numeral: ""
        }

        for (const element in numerals) {
            processNumeral(result, element, numerals[element]);
        }

        outputBtn.classList.remove("changeForAlert");
        outputBtn.textContent = result.numeral;
    }
}

inputBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        convertToRomanNumeral();
    }
});

convertBtn.addEventListener("click", convertToRomanNumeral);

window.onload = () => {
    inputBtn.value = "";
}