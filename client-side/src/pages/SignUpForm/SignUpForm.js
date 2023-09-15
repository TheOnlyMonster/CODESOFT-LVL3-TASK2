import FormInput from "../../components/FormInput";
import PopUpForm from "../PopUpForm/PopUpForm";
import { signUpAction } from "../../store/actions/auth-actions";
import * as yup from "yup";
const SignUpForm = ({ open, handleClose }) => {
  const schema = yup.object().shape({
    email: yup
      .string("Email must be a string")
      .required("Email is required")
      .email("Email must be a valid email"),
    password: yup
      .string("Password must be a string")
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    confirmPassword: yup
      .string("Confirm Password must be a string")
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
    Fname: yup
      .string("First name must be a string")
      .required("First name is required"),
    Lname: yup
      .string("Last name must be a string")
      .required("Last name is required"),
  });
  return (
    <PopUpForm
      open={open}
      submitText="Sign Up"
      action={signUpAction}
      handleClose={handleClose}
      schema={schema}
      formNames={["email", "password", "confirmPassword", "Fname", "Lname"]}
      type={"json"}
    >
      <FormInput label={"First Name"} type="text" name="Fname" />
      <FormInput label={"Last Name"} type="text" name="Lname" />
      <FormInput label={"Email"} type="email" name="email" />
      <FormInput label={"Password"} type="password" name="password" />
      <FormInput label={"Confirm Password"} type="password" name="confirmPassword" />
    </PopUpForm>
  );
};
export default SignUpForm;
