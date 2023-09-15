import { forwardRef, useEffect } from "react";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/joy/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import {
  idleLoading,
  idleError,
  idleSuccessMessage,
} from "../../store/slices/auth-slice";
import usePopUp from "../../hooks/usePopUp";
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const Notification = () => {
  const dispatch = useDispatch();
  const [notifyOpen, handleNotifyOpen, handleNotifyClose] = usePopUp();
  const { errors, isLoading, successMessage } = useSelector(
    (state) => state.authReducer
  );
  useEffect(() => {
    if (isLoading === false || isLoading === true) {
      handleNotifyOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);
  return (
    (isLoading || errors || successMessage) && (
      <Snackbar
        open={notifyOpen}
        autoHideDuration={isLoading ? null : 1500}
        onClose={() => {
          dispatch(idleError());
          dispatch(idleSuccessMessage());
          dispatch(idleLoading());
          handleNotifyClose();
        }}
      >
        <Alert severity={isLoading ? "info" : errors ? "error" : "success"}>
          {isLoading ? (
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <h1>Loading...</h1>
              <CircularProgress
                color="primary"
                size="sm"
                value={25}
                variant="solid"
              />
            </div>
          ) : errors ? (
            errors.msg || "Something went wrong!"
          ) : (
            successMessage
          )}
        </Alert>
      </Snackbar>
    )
  );
};

export default Notification;
