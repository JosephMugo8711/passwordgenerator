// Get the elements from the DOM
const inputSlider = document.getElementById("inputSlider");
const sliderValue = document.getElementById("sliderValue");
const passBox = document.getElementById("passBox");

const lowercaseEl = document.getElementById("lowercase");
const uppercaseEl = document.getElementById("uppercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");

const generateBtn = document.getElementById("genBtn");
const copyBtn = document.getElementById("copyIcon");
const passIndicator = document.getElementById("passIndicator");

// Define character sets for password generation
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}\\|;':\",./<>?";

// Set initial slider value
sliderValue.textContent = inputSlider.value;

// Update slider value when slider is moved
inputSlider.addEventListener("input",()=>{
    sliderValue.textContent = inputSlider.value;
    generatePassword();
});

// Generate password based on selected options
function generatePassword(){
    const length = inputSlider.value;
    let characters = "";
    let password = "";

    characters += lowercaseEl.checked ? lowercaseLetters : "";
    characters += uppercaseEl.checked ? uppercaseLetters : "";
    characters += numbersEl.checked ? numbers : "";
    characters += symbolsEl.checked ? symbols : "";

    for(let i = 0 ; i < length ; i++){
       password += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    passBox.value = password;
    updatePasswordIndicator();
}

// Generate password when button is clicked
generateBtn.addEventListener("click",()=>{
    generatePassword();
});

// Update password strength indicator
function updatePasswordIndicator(){
    const passwordStrength = getPasswordStrength(passBox.value);
    passIndicator.className = "pass-indicator " + passwordStrength;
}

// Determine password strength based on length
function getPasswordStrength(password){
    if(password.length <=10){
        return "weak";
    }else if (password.length <=20){
        return "medium";
    }else{
        return "strong";
    }
}

// Update password indicator on page load
window.addEventListener('DOMContentLoaded',()=>{
    updatePasswordIndicator();
});

// Copy password to clipboard
copyBtn.addEventListener("click",()=>{
    if(passBox.value != "" || passBox.value.length >= 1){
        navigator.clipboard.writeText(passBox.value);
        copyBtn.innerText = "check";
        setTimeout(()=>{
            copyBtn.innerHTML = "content_copy";
        },3000);
    }
});
