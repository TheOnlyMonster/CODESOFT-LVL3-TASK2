import PopUpForm from "../PopUpForm/PopUpForm";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import { useState } from "react";
const SignInForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <PopUpForm action="http://localhost:5000/sign-in" method="POST" type="json" formData={{ email, password }} handleOk={() => navigate("/")} >
      <FormInput inputValidation={[{ regex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, errorMessage: "Please enter a valid email" }]} type="email" placeholder="Email" name="email" getValue={(email) => setEmail(email)} />
      <FormInput inputValidation={[]} type="password" placeholder="Password" name="password" getValue={(password) => setPassword(password)} />
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
