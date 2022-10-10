import { useState } from "react";
import styles from "./Home.module.scss";

import { useNavigate, Link } from "react-router-dom";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { PostDetail } from "../../components/PostDetail/PostDetail";

export function Home() {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Insira um interesse aqui..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btnDark">Pesquisar</button>
      </form>
      <div>
        {posts && posts.map((post) => <PostDetail post={post} key={post.id} />)}

        {loading && <p>Carregando...</p>}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link className="btn" to="posts/create">
              Criar post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
