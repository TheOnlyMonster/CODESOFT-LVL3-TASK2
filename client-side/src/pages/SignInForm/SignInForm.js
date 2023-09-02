import useInputValidation from "../../hooks/useInputValidation";
import styles from "../PopUpForm/PopUpForm.module.css";
import PopUpForm from "../PopUpForm/PopUpForm";
import { Link, useNavigate } from "react-router-dom";
const SignInForm = () => {
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
  ] = useInputValidation([]);
  function handleValidation() {
    if (
      !emailValidation().isValid ||
      !passwordValidation().isValid
    ) {
      return false;
    }
    return true;
  }
  return (
    <PopUpForm handleValidation={handleValidation} action="http://localhost:5000/sign-in" method="POST" type="json" formData={{ email, password }} handleOk={() => navigate("/")} >
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
        {!emailValidation().isValid && (
          <p>{emailValidation().errorMessage}</p>
        )}
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
      <label>
        <Link to="/sign-up">Don't have an account? Sign up</Link>
      </label>
      <button type="submit">Sign In</button>
      <button type="button" onClick={() => navigate("/")}>
          Close
      </button>
    </PopUpForm>
  );
};

export default SignInForm;
