// import { useState } from "react";
// const useInputValidation = (errors) => {
//   const [input, setInput] = useState("");
//   const [isBlur, setIsBlur] = useState(false);

//   function handleInput(e) {
//     if (e.target.files) {
//       setInput(e.target.files[0]);
//     } else {
//       setInput(e.target.value);
//     }
//   }
//   function handleBlur(e) {
//     setIsBlur(true);
//   }
//   function handleFocus(e) {
//     setIsBlur(false);
//   }

//   const isInputValid = (fn) => {
//     if (!isBlur) {
//       return { isValid: true };
//     }
//     if (fn) {
//       return fn(input);
//     }
//     if (input === "") {
//       return { isValid: false, errorMessage: "This field is required" };
//     }
//     for (const error of errors) {
//       if (!input.match(error.regex)) {
//         return { isValid: false, errorMessage: error.errorMessage };
//       }
//     }
//     return { isValid: true };
//   };
//   return [input, handleInput, handleBlur, handleFocus, isInputValid];
// };

// export default useInputValidation;
