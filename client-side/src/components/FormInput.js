import { useEffect } from "react";
import useInputValidation from "../hooks/useInputValidation";
import styles from "../pages/PopUpForm/PopUpForm.module.css";
const FormInput = (props) => {
  const [
    inputValue,
    handleInputValue,
    handleInputBlur,
    handleInputFocus,
    inputValidation,
  ] = useInputValidation(props.inputValidation);
  useEffect(() => {
    props.getValue(inputValue);
  }, [inputValue, props]);
  return (
    <label key={props.name}>
      <input
        className={!inputValidation().isValid ? styles.error : ""}
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        onChange={handleInputValue}
        value={inputValue}
        onBlur={handleInputBlur}
        onFocus={handleInputFocus}
        required
      />
      {!inputValidation().isValid && <p>{inputValidation().errorMessage}</p>}
    </label>
  );
};

export default FormInput;
