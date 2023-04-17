function calculate(operator) {
    const num1 = parseFloat(document.getElementById("num-1").value);
    const num2 = parseFloat(document.getElementById("num-2").value);
    const result = document.getElementById("result");

    switch (operator) {
        case "+":
            result.textContent = num1 + num2;
            break;
        case "-":
            result.textContent = num1 - num2;
            break;
        case "*":
            result.textContent = num1 * num2;
            break;
        case "/":
            result.textContent = num1 / num2;
            break;
        default:
            result.textContent = "Invalid operator";
    }
}