import styles from "./PopUpForm.module.css";
import Transition from "../../components/Transition/Transition";
import { useState } from "react";
import { Form } from "react-router-dom";
export default function PopUpForm(props) {
  const [serverError, setServerError] = useState({ val: false, msg: "" });
  async function formSubmitHandler(e) {
    e.preventDefault();
    const isValid = props.handleValidation(setServerError);
    if (!isValid) {
      return;
    }
    let data;
    if (props.type === "mixed") {
      data = new FormData();
      for (const formProp of props.formData) {
        data.append(formProp.name, formProp.value);
      }
    }else {
      data = props.formData;
      console.log(data);
    }
    try {
      const headers = props.type === "json" ? { headers: { "Content-Type": "application/json" } } : {}
      const res = await fetch(props.action, {
        method: props.method,
        body: props.type === "mixed" ? data : JSON.stringify(props.formData),
        ...headers
      });
      if (res.status === 422) {
        const errors = await res.json();
        throw errors;
      }
      if (res.ok) {
        setServerError({ val: false, msg: "" });
        props.handleOk();
      }
    }
    catch (error) {
      if (error.statusCode === 422) {
        setServerError({ val: true, msg: error.msg });
      } else {
        // ...
      }
    }
  }
  return (
    <Transition>
      <div className={styles.popup}>
        <div className={styles["popup-inner"]}>
          {serverError.val && (
            <input disabled className={styles.error} value={serverError.msg} />
          )}
          <Form action={props.action} method={props.method} onSubmit={formSubmitHandler}>
            {props.children}
          </Form>
        </div>
      </div>
    </Transition>
  )
}