function clg(name, bool, num1) {
    if (num1 > 0) {
        return "number is positive";
    }
    console.log("My name is", name);
    if (bool) {
        return "true";
    }
    console.log("Today is", new Date());
}