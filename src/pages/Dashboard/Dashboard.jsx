import { Link } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import styles from "./Dashboard.module.scss";

export function Dashboard() {
  const { user } = useAuthContext();
  const uid = user.uid;
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);
  const { deleteDocument } = useDeleteDocument("posts");

  if (loading) {
    return <p>Carregando...</p>;
  }

  console.log(user);

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard de {user.displayName}</h2>
      <p>Gerencie os seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className="btn">
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <div>
          <div className={styles.postHeader}>
            <span>Título </span>
            <span>Ações</span>
          </div>
          {posts &&
            posts.map((post) => (
              <div key={post.id} className={styles.postRow}>
                <p>{post.title}</p>
                <div>
                  <Link to={`/posts/${post.id}`} className="btn btnOutline">
                    Ver post
                  </Link>
                  <Link
                    to={`/posts/edit/${post.id}`}
                    className="btn btnOutline"
                  >
                    Editar post
                  </Link>
                  <button
                    onClick={() => deleteDocument(post.id)}
                    className="btn btnOutline btnDanger"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
