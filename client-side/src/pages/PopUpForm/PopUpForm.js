import styles from "./PopUpForm.module.css";
import { Form, useLocation } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import FormInput from "../../components/FormInput";

export default function PopUpForm({
  formNames=[],
  type = null,
  item = null,
  action,
  schema,
  open,
  handleClose,
  children,
  submitText,
  enableReinitialize=true
}) {
  // const [serverError, setServerError] = useState({ val: false, msg: "" });
  const dispatch = useDispatch();
  const location = useLocation();

  function useQuery() {
    return new URLSearchParams(location.search);
  }
  const initialValues = {};
  for (const formName of formNames) {
    initialValues[formName] = "";
  }
  const query = useQuery();
  const page = +query.get("page") || 1;
  function formSubmitHandler(values) {
    let data;
    if (type === "mixed") {
      data = new FormData();
      formNames.forEach((name) => {
        data.append(name, values[name]);
      });
    } else if(type === "json") {
      data = JSON.stringify(values);
    } else {
      data = item;
    }
    dispatch(action(page, data));
    // props.setIsSubmitted(false)
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
      {/* {serverError.val && (
        <input disabled className={styles.error} value={serverError.msg} />
      )} */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.popup}>
          <div className={styles["popup-inner"]}>
            <Formik
              onSubmit={formSubmitHandler}
              initialValues={initialValues}
              validationSchema={schema}
              enableReinitialize={enableReinitialize}
            >
              {({ handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                  {children}
                  {type === "mixed" && (
                    <FormInput
                      label="Image"
                      type="file"
                      helperText="Image"
                      name="image"
                      setFieldValue={setFieldValue}
                    />
                  )}
                  <div>
                    <button type="submit">{submitText}</button>
                    <button type="button" onClick={handleClose}>
                      Close
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Modal>
    </>
  );
}
