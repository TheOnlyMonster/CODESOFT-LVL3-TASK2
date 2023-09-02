import useInputValidation from "../../hooks/useInputValidation";
import styles from "../PopUpForm/PopUpForm.module.css";
import PopUpForm from "../PopUpForm/PopUpForm";
import { useNavigate } from "react-router-dom";
const AuthForm = () => {
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
  function handleSubmit(setServerError) {
    if (
      !emailValidation().isValid ||
      !passwordValidation().isValid
    ) {
      return;
    }
    const data = {
      email,
      password,
    }
    fetch("http://localhost:5000/sign-in", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    })
  }
  return (
    <PopUpForm onSubmit={handleSubmit} action="http://localhost:5000/sign-in" method="POST">
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
      <button type="submit">Sign In</button>
      <button type="button" onClick={() => navigate("/")}>
          Close
      </button>
    </PopUpForm>
  );
};

export default AuthForm;
