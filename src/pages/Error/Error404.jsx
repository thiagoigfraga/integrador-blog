import { useState } from "react";
import styles from "./Error404.module.scss";
import { GoAlert } from "react-icons/go";
import { Link } from "react-router-dom";

export function Error404() {
  return (
    <div className={styles.home}>
      <div className={styles.noposts}>
        <GoAlert size={70} />
        <h1>Página não encontrada!</h1>
        <Link className="btn" to="/">
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}
