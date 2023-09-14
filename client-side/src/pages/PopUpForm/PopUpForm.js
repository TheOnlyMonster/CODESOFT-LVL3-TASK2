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
  enableReinitialize=false
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
  }
  return (
    <>
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
