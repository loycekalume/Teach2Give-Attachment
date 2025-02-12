// Select all buttons with the class 'btn' 
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", function () {
        const buttonText = button.textContent.trim();  // Get the clicked button's text
        const display = document.getElementById("display");

        // If the button is 'C', clear the display
        if (buttonText === "C") {
            display.value = '';  // Clear display
        } else if (buttonText === "×") {
            display.value += '*';  // Append '*' for multiplication
        } else if (buttonText === "-") {
            display.value += "-";  // Append '-' for subtraction
        } else if (buttonText === "÷") {
            display.value += "/";  // Append '/' for division
        } else if (buttonText === "=") {
            // Evaluate the expression when '=' is clicked
            try {
                display.value = eval(display.value);  // Evaluate and display the result
            } catch (e) {
                display.value = 'Error';  // If there's an error (invalid expression), display 'Error'
            }
        } else if (buttonText === "←") {
            
            display.value = display.value.slice(0, -1);  // Remove the last character
        } else if (buttonText === "x²") {
            
            const currentValue = parseFloat(display.value);// Square the current value in the display
            if (!isNaN(currentValue)) {
                display.value = currentValue * currentValue;
            }
        } else if (buttonText === "√x") {
            // Square root of the current value in the display
            const currentValue = parseFloat(display.value);
            if (!isNaN(currentValue)) {
                display.value = Math.sqrt(currentValue);
            }
        } else {
     
            display.value += buttonText;        // Append the clicked button's text to the display field
        }
    });
});
