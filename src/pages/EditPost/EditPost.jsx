import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthContext } from '../../contexts/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';

import styles from './EditPost.module.scss';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

export function EditPost() {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const { id } = useParams();
    const { document: post } = useFetchDocument('posts', id);

    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [body, setBody] = useState('');
    const [tags, setTags] = useState([]);
    const [formError, setFormError] = useState('');

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setImage(post.image);
            setBody(post.body);

            const textTags = post.tags.join(',');

            setTags(textTags);
        }
    }, [post]);

    const { updateDocument, response } = useUpdateDocument('posts');

    const handleSubmit = (e) => {
        e.preventDefault();

        setFormError('');

        try {
            const img = new URL(image);
        } catch (error) {
            setFormError('Insira uma imagem válida em URL.');
        }

        const tagsArray = tags
            .split(',')
            .map((tag) => tag.trim().toLowerCase());

        if (!title || !image || !body || !tags) {
            setFormError('Preencha todos os campos.');
        }

        if (formError) return;

        const data = {
            title,
            body,
            image,
            tags: tagsArray,
        };

        updateDocument(id, data);

        navigate('/dashboard');
    };

    return (
        <div className={styles.editPost}>
            {post && (
                <>
                    <h2>Editando post: {post.title}</h2>
                    <p>Altere os dados do post como desejar</p>

                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>Título:</span>
                            <input
                                type="text"
                                name="title"
                                placeholder="Escreva seu título..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            <span>URL da imagem:</span>
                            <input
                                type="text"
                                name="image"
                                placeholder="Insira uma imagem que represente seu post..."
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                required
                            />
                        </label>
                        <p className={styles.previewTitle}>
                            Preview da imagem atual:{' '}
                        </p>
                        <img
                            className={styles.previewImage}
                            src={post.image}
                            alt={post.title}
                        />
                        <label>
                            <span>Conteúdo:</span>
                            <textarea
                                name="body"
                                placeholder="Insira o conteúdo do post..."
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                                required
                            />
                        </label>
                        <label>
                            <span>Tags:</span>
                            <input
                                type="text"
                                name="tags"
                                placeholder="Insira as tags separadas por vírgula"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                required
                            />
                        </label>

                        {!response.loading && (
                            <button className="btn">Editar</button>
                        )}
                        {response.loading && (
                            <button className="btn" disabled>
                                Aguarde
                            </button>
                        )}
                        {(response.error || formError) && (
                            <p className="error">
                                {response.error || formError}
                            </p>
                        )}
                    </form>
                </>
            )}
        </div>
    );
}
