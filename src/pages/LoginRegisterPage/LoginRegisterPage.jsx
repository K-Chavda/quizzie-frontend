import React, { useState } from "react";
import styles from "./LoginRegisterPage.module.css";
import Login from "./LoginPage/Login";
import Register from "./RegisterPage/Register";

function LoginRegisterPage() {
  const [activeTab, setActiveTab] = useState("Sign-Up");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.logoText}>QUIZZIE</h1>
      <div className={styles.switchContainer}>
        <button
          className={`${styles.button} ${
            activeTab === "Sign-Up" ? styles.selected : ""
          }`}
          onClick={() => handleTabClick("Sign-Up")}
        >
          Sign Up
        </button>
        <button
          className={`${styles.button} ${
            activeTab === "Login" ? styles.selected : ""
          }`}
          onClick={() => handleTabClick("Login")}
        >
          Log In
        </button>
      </div>
      <div className={styles.loginRegisterContainer}>
        {activeTab === "Sign-Up" && <Register setActiveTab={setActiveTab} />}
        {activeTab === "Login" && <Login />}
      </div>
    </div>
  );
}

export default LoginRegisterPage;
