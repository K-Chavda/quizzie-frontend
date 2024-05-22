import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../components/Toast/Toast";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });

    setError({
      email: "",
      password: "",
    });
  };

  const handleLoginBtnClick = (e) => {
    e.preventDefault();
    const { email, password } = value;

    setError((prevError) => ({
      ...prevError,
      email: !email ? "Invalid email" : "",
    }));

    setError((prevError) => ({
      ...prevError,
      password: !password ? "Please enter your password" : "",
    }));

    if (email && password) {
      handleUserLogin();
    }
  };

  const handleUserLogin = async () => {
    if (error.email || error.password) {
      return;
    }

    const { email, password } = value;

    if (!email || !password) {
      return;
    }

    try {
      await axios
        .post("http://localhost:3000/api/v1/user/login", {
          email: email,
          password: password,
        })
        .then((data) => {
          localStorage.setItem("token", data.data.token);
          navigate("/home");
        })
        .catch((error) => {
          showToast(error.response.data.message, "error");
        });
    } catch (error) {
      showToast("Something Went Wrong!", "error");
    }
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <form className={styles.form}>
          <div className={styles.formField}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder={error.email}
              value={value.email}
              onChange={handleOnChange}
              className={error.email ? styles.errorBorder : ""}
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder={error.password}
              value={value.password}
              onChange={handleOnChange}
              autoComplete="true"
              className={error.password ? styles.errorBorder : ""}
            />
          </div>
          <button className={styles.submitBtn} onClick={handleLoginBtnClick}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
