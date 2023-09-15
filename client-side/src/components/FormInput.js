import { TextField, Typography } from "@mui/material";
import { useField } from "formik";

const FormInput = ({ label, type, name, setFieldValue = null, disabled=false, value=null }) => {
  const [field, meta] = useField(name);
  if (type === "file") {
    return (
      <>
        <TextField
          onChange={(e) => {
            setFieldValue(name, e.target.files[0]);
          }}
          label={type === "file" ? "" : label}
          variant="outlined"
          type={type}
          error={meta.touched && Boolean(meta.error)}
          name={name}
        />
        {meta.touched && meta.error && (
          <Typography variant="body2" color="error">
            {meta.error}
          </Typography>
        )}
      </>
    );
  }
  return (
    <>
      <TextField
        {...field}
        label={type === "file" ? "" : label}
        variant="outlined"
        type={type}
        error={meta.touched && Boolean(meta.error)}
        name={name}
        disabled={disabled}
        value={value || field.value}
      />
      {meta.touched && meta.error && (
        <Typography variant="body2" color="error">
          {meta.error}
        </Typography>
      )}
    </>
  );
};

export default FormInput;
