import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

import styles from "./NewPost.module.scss";

export function NewPost() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [formError, setFormError] = useState("");

  const { response, insertDocument } = useInsertDocument("posts");

  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormError("");

    try {
      const img = new URL(image);
      img.isError();
    } catch (error) {
      setFormError("Insira uma imagem válida em URL.");
    }

    if (!title || !image || !body) {
      setFormError("Preencha todos os campos.");
    }

    if (formError) return;

    insertDocument({
      title,
      body,
      image,
      uid: user.uid,
      createdBy: user.displayName,
    });

    navigate("/");
  };

  return (
    <div className={styles.newPost}>
      <h2>Faça um novo Post!</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>

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
        {!response.loading && <button className="btn">Criar Post</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde
          </button>
        )}
        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  );
}
