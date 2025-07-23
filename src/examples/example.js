// const fullNames = ["Aday Lovina", "Benstras Turing", "Grace Ojo"];
// const lastNames = fullNames.map(function getLastName(name) {
//   return name.split(" ").slice(0)[1];
// });

// console.log(lastNames);

// const globalVariable = "I'm Global";

// function outerFunction() {
//   const outerVariable = "I'm Outer";

//   function innerFunction() {
//     const innerVariable = "I'm Inner";
//     console.log(globalVariable); // I'm Global
//     console.log(outerVariable); // I'm Outer
//     console.log(innerVariable); // I'm Inner
//   }

//   innerFunction();

//   console.log(innerVariable); // ReferenceError: innerVariable is not defined
//   console.log(this); // in this scope, "this" refers to the global object (the window in browsers)
// }
// outerFunction();

// function firstFunction() {
//   console.log("First Function");
//   secondFunction();
//   console.log("Back to First Function");
// }

// function secondFunction() {
//   console.log("Second Function");
//   thirdFunction();
//   console.log("Back to Second Function");
// }

// function thirdFunction() {
//   console.log("Third Function");
//   // Uncomment the next line to see the stack overflow error (RangeError)
//   // thirdFunction();
//   console.log("Back to Third Function");
// }

// firstFunction();

// function mystery(num) {
//   if (num <= 0) {
//     return 0;
//   } else {
//     return num + mystery(num - 1);
//   }
// }

// console.log(mystery(5));

// function outerFunction(x) {
//   let innerVar = x * 2;

//   function innerFunction(y) {
//     return innerVar + y;
//   }

//   return innerFunction;
// }

// let closure = outerFunction(5);
// console.log(closure(5));
