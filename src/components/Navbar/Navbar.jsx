import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { useNavigate, Link, NavLink } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <div className={styles.navbarContainer}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>QUIZZIE</div>
        </div>
        <div className={styles.navLinksContainer}>
          <div className={styles.navLinks}>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.selected}`
                  : styles.navLink
              }
              to="/dashboard"
            >
              Dashboard
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.selected}`
                  : styles.navLink
              }
              to="/analytics"
            >
              Analytics
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.selected}`
                  : styles.navLink
              }
              to="/createActivity"
            >
              Create Quiz
            </NavLink>
          </div>
        </div>
        <div className={styles.logoutContainer}>
          <div className={styles.login} onClick={handleLogoutClick}>
            LOGOUT
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
