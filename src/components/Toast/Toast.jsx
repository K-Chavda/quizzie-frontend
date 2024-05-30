import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Toast.module.css";
import { nanoid } from "nanoid";

const toastId = nanoid();

const showToast = (message, type) => {
  const options = {
    type: type,
    bodyClassName: styles.toastText,
    toastId: toastId,
  };
  toast(message, options);
};

const ToastContainerComponent = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};

const promiseToast = (promise, message) => {
  toast.promise(promise, {
    pending: message.pending,
    success: message.success,
    error: message.error,
  });
};

export { ToastContainerComponent, showToast, promiseToast };
