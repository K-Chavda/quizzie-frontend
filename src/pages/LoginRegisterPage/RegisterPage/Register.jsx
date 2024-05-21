import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";

function Register() {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleOnChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });

    setError({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const validateInputValue = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = value;

    setError((prevError) => ({
      ...prevError,
      name: !name ? "Invalid name" : "",
    }));

    setError((prevError) => ({
      ...prevError,
      email: !email ? "Invalid email" : "",
    }));

    setError((prevError) => ({
      ...prevError,
      password: !password ? "Weak password" : "",
    }));

    setError((prevError) => ({
      ...prevError,
      confirmPassword:
        !confirmPassword || confirmPassword !== password
          ? "password doesn't match"
          : "",
    }));
  };

  return (
    <>
      <div className={styles.mainContainer}>
        <form className={styles.form}>
          <div className={styles.formField}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={error.name}
              value={value.name}
              onChange={handleOnChange}
              className={error.name ? styles.errorBorder : ""}
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder={error.email}
              value={value.email}
              onChange={handleOnChange}
              className={error.name ? styles.errorBorder : ""}
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
              className={error.name ? styles.errorBorder : ""}
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder={error.confirmPassword}
              value={value.confirmPassword}
              onChange={handleOnChange}
              autoComplete="true"
              className={error.name ? styles.errorBorder : ""}
            />
          </div>
          <button className={styles.submitBtn} onClick={validateInputValue}>
            Sign-Up
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;
