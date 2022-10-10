import React from 'react';
import { Link } from 'react-router-dom';
import { PostDetail } from '../../components/PostDetail/PostDetail';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useQuery } from '../../hooks/useQuery';
import styles from './Search.module.scss';

export function Search() {
    const query = useQuery();

    const search = query.get('q');
    const { documents: posts } = useFetchDocuments('posts', search);

    return (
        <div className={styles.searchContainer}>
            <h1>Resultados encontrados para: {search}</h1>
            <div>
                {posts && posts.length === 0 && (
                    <>
                        <p>
                            Não foram encontrados posts a partir da sua busca...
                        </p>
                        <Link to="/" className="btn btnDark">
                            Voltar
                        </Link>
                    </>
                )}
                {posts &&
                    posts.map((post) => (
                        <PostDetail key={post.id} post={post} />
                    ))}
            </div>
        </div>
    );
}
