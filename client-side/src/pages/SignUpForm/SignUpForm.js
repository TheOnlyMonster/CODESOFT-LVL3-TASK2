import useInputValidation from "../../hooks/useInputValidation";
import PopUpForm from "../PopUpForm/PopUpForm";
import styles from "../PopUpForm/PopUpForm.module.css";
import { useNavigate } from "react-router-dom";
const SignUpForm = () => {
  const navigate = useNavigate();
  const [
    email,
    handleEmail,
    handleEmailBlur,
    handleEmailFocus,
    emailValidation,
  ] = useInputValidation([
    {
      regex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      errorMessage: "Please enter a valid email",
    },
  ]);
  const [
    password,
    handlePassword,
    handlePasswordBlur,
    handlePasswordFocus,
    passwordValidation,
  ] = useInputValidation([
    {
      regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      errorMessage:
        "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number and one special character",
    },
  ]);
  const [
    confirmPassword,
    handleConfirmPassword,
    handleConfirmPasswordBlur,
    handleConfirmPasswordFocus,
    confirmPasswordValidation,
  ] = useInputValidation([]);
  function handleValidation() {
    if (!emailValidation().isValid || !passwordValidation().isValid) {
      return false;
    }
    return true;
  }
  return (
    <PopUpForm handleValidation={handleValidation} action="http://localhost:5000/sign-up" method="POST" type="json" formData={{ email, password, confirmPassword }} handleOk={() => navigate("/")}>
      <label key={"email"}>
        <input
          className={!emailValidation().isValid ? styles.error : ""}
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleEmail}
          value={email}
          onBlur={handleEmailBlur}
          onFocus={handleEmailFocus}
          required
        />
        {!emailValidation().isValid && <p>{emailValidation().errorMessage}</p>}
      </label>
      <label key={"password"}>
        <input
          className={!passwordValidation().isValid ? styles.error : ""}
          type="password"
          placeholder="Password"
          name="password"
          onChange={handlePassword}
          value={password}
          onBlur={handlePasswordBlur}
          onFocus={handlePasswordFocus}
          required
        />
        {!passwordValidation().isValid && (
          <p>{passwordValidation().errorMessage}</p>
        )}
      </label>
      <label key={"confirmPassword"}>
        <input
          className={!confirmPasswordValidation().isValid ? styles.error : ""}
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={handleConfirmPassword}
          value={confirmPassword}
          onBlur={handleConfirmPasswordBlur}
          onFocus={handleConfirmPasswordFocus}
          required
        />
        {!confirmPasswordValidation().isValid && (
          <p>{confirmPasswordValidation().errorMessage}</p>
        )}
      </label>
      <button type="submit">Sign Up</button>
      <button type="button" onClick={() => navigate("/")}>
        Close
      </button>
    </PopUpForm>
  );
};
export default SignUpForm;
