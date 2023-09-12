import styles from "./PopUpForm.module.css";
import { useState } from "react";
import { Form, useLocation } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { addProductAction } from "../../store/products-actions";
export default function PopUpForm(props) {
  const [serverError, setServerError] = useState({ val: false, msg: "" });
  const dispatch = useDispatch();
  const location = useLocation();
  function useQuery() {
    return new URLSearchParams(location.search);
  }
  const query = useQuery();
  const page = +query.get("page") || 1;
  async function formSubmitHandler(e) {
    e.preventDefault();
    let data;
    if (props.type === "mixed") {
      data = new FormData();
      for (const formProp of props.formData) {
        data.append(formProp.name, formProp.value);
      }
    } else {
      data = props.formData;
    }
    dispatch(addProductAction(page, data));
    // try {
    //   const headers =
    //     props.type === "json"
    //       ? { headers: { "Content-Type": "application/json" } }
    //       : {};
    //   const res = await fetch(props.action, {
    //     method: props.method,
    //     body: props.type === "mixed" ? data : JSON.stringify(props.formData),
    //     ...headers,
    //   });
    //   if (res.status >= 400 && res.status < 500) {
    //     const errors = await res.json();
    //     throw errors;
    //   }
    //   if (res.ok) {
    //     setServerError({ val: false, msg: "" });
    //     props.handleClose();
    //   }
    // } catch (error) {
    //   if (error.statusCode >= 400 && error.statusCode < 500) {
    //     setServerError({ val: true, msg: error.msg });
    //   } else {
    //     // ...
    //   }
    // }
  }
  return (
    <>
      {serverError.val && (
        <input disabled className={styles.error} value={serverError.msg} />
      )}
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.popup}>
          <div className={styles["popup-inner"]}>
            <Form
              action={props.action}
              method={props.method}
              onSubmit={formSubmitHandler}
            >
              {props.children}
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
}
