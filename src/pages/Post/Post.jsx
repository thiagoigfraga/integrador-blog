import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

import styles from "./Post.module.scss";

export function Post() {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  return (
    <div className={styles.postContainer}>
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
        </>
      )}
    </div>
  );
}
