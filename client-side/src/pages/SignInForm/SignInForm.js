import PopUpForm from "../PopUpForm/PopUpForm";
import FormInput from "../../components/FormInput";
import * as yup from "yup";
import { signInAction } from "../../store/actions/auth-actions";
const SignInForm = ({ handleClose, open }) => {
  const schema = yup.object().shape({
    email: yup
      .string("Email must be a string")
      .required("Email is required")
      .email("Email must be a valid email"),
    password: yup
      .string("Password must be a string")
      .required("Password is required")
  });
  return (
    <PopUpForm
      open={open}
      submitText="Sign In"
      action={signInAction}
      handleClose={handleClose}
      schema={schema}
      formNames={["email", "password"]}
      type={"json"}
    >
      <FormInput label={"Email"} type="email" name="email" />
      <FormInput label={"Password"} type="password" name="password" />
      <button>Don't have an account? Sign up</button>
    </PopUpForm>
  );
};

export default SignInForm;
