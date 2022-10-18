import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useAuthentication } from "../../hooks/useAuthentication";
import styles from "./NavBar.module.scss";

export function NavBar() {
  const { user } = useAuthContext();
  const { logout } = useAuthentication();

  return (
    <nav className={styles.navBar}>
      <NavLink to="/" className={styles.brand}>
        <span>MRT Blog</span>
      </NavLink>

      <ul className={styles.linksList}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? styles.active : "")}
          >
            Sobre
          </NavLink>
        </li>
        {!user && (
          <>
            <li>
              <NavLink
                to="register"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Registro
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Login
              </NavLink>
            </li>
          </>
        )}

        {user && (
          <>
            <li>
              <NavLink
                to="/posts/create"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Novo Post
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                Dashboard
              </NavLink>
            </li>
            <li onClick={logout}>
              <button>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
