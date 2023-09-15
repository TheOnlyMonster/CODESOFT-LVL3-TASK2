import { useState  } from "react";
import FormInput from "../../components/FormInput";
import PopUpForm from "../PopUpForm/PopUpForm";
import { useNavigate } from "react-router-dom";
const SignUpForm = () => {
  const navigate = useNavigate();
  const [Fname, setFname] = useState("");
  const [Lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <PopUpForm
      action="http://localhost:5000/sign-up"
      method="POST"
      type="json"
      formData={{ email, password, confirmPassword, Fname, Lname  }}
      handleOk={() => navigate("/")}
    >
      <FormInput inputValidation={[{regex: /^[a-zA-Z'-]+(\s[a-zA-Z'-]+)*$/, errorMessage: "Please enter a valid name"}]} type="text" placeholder="First Name" name="Fname" getValue={(Fname)=>setFname(Fname)} />
      <FormInput inputValidation={[{regex: /^[a-zA-Z'-]+(\s[a-zA-Z'-]+)*$/, errorMessage: "Please enter a valid name"}]} type="text" placeholder="Last Name" name="Lname" getValue={(Lname)=>setLname(Lname)} />
      <FormInput inputValidation={[{regex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, errorMessage: "Please enter a valid email"}]} type="email" placeholder="Email" name="email" getValue={(email)=>setEmail(email)} />
      <FormInput inputValidation={[{ regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/, errorMessage: "Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number and one special character" }]} type="password" placeholder="Password" name="password" getValue={(password)=>setPassword(password)} />
      <FormInput inputValidation={[]} type="password" placeholder="Confirm Password" name="confirmPassword" getValue={(confirmPassword)=>setConfirmPassword(confirmPassword)} />
      <button type="submit">Sign Up</button>
      <button type="button" onClick={() => navigate("/")}>
        Close
      </button>
    </PopUpForm>
  );
};
export default SignUpForm;
