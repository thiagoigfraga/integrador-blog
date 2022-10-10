import { Link } from "react-router-dom";
import styles from "./PostDetail.module.scss";

export function PostDetail({ post }) {
  return (
    <div className={styles.postDetail}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p className={styles.createdBy}>{post.createdBy}</p>
      <Link to={`/posts/${post.id}`} className="btn btnOutline">
        Ler
      </Link>
    </div>
  );
}
