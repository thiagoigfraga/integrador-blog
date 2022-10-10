import { Link } from "react-router-dom";
import styles from "./About.module.scss";

export function About() {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o <span>Blog</span>
      </h2>
      <p>Um projeto feito em React no front-end e firebase no back-end</p>
      <p>Marcelo Pavani, Rafael Fischer e Thiago Fraga</p>
      <Link to="/posts/create" className="btn">
        Criar Post
      </Link>
    </div>
  );
}
