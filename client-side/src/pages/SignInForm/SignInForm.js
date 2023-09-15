import PopUpForm from "../PopUpForm/PopUpForm";
import FormInput from "../../components/FormInput";
import * as yup from "yup";
import { signInAction } from "../../store/actions/auth-actions";
import Button from '@mui/material/Button';
import usePopUp from '../../hooks/usePopUp';
import SignUpForm from "../SignUpForm/SignUpForm";
const SignInForm = ({ handleClose, open }) => {
  const [signUpOpen, signUpHandleClickOpen, signUpHandleClose] = usePopUp();
  const schema = yup.object().shape({
    email: yup
      .string("Email must be a string")
      .required("Email is required")
      .email("Email must be a valid email"),
    password: yup
      .string("Password must be a string")
      .required("Password is required")
  });
  return signUpOpen ? <SignUpForm handleClose={signUpHandleClose} open={signUpOpen} /> : (
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
      <div>
        <Button onClick={signUpHandleClickOpen}>Don't have an account? Sign up</Button>
      </div>
    </PopUpForm>
  );
};

export default SignInForm;
