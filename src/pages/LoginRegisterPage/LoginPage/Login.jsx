import React, { useState } from "react";
import styles from "./Login.module.css";

function Login() {
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
