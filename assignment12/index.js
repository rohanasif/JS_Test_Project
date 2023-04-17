function calculate(num1, num2, operator) {
    if (operator === "+") {
        return num1 + num2;
    }
    else if (operator === "-") {
        return num1 - num2;
    }
    else if (operator === "*") {
        return num1 * num2;
    }
    else if (operator === "/") {
        return num1 / num2;
    }
    else {
        return "Invalid operators"
    }
}

console.log(calculate(1, 2, "+"));