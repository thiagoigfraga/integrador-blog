import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";
import styles from "./register.module.scss";

export function Register() {
  const [displayName, setdisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { createUser, authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      displayName: displayName,
      bio: bio,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais!");
      return;
    }

    await createUser(user);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar!</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input
            type="text"
            placeholder="Nome do usuário"
            name="displayName"
            value={displayName}
            onChange={(e) => setdisplayName(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Email:</span>
          <input
            type="mail"
            placeholder="E-mail do usuário"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Biografia:</span>
          <input
            type="text"
            placeholder="Descrição do usuário"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Senha:</span>
          <input
            type="password"
            placeholder="Senha do usuário"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Confirmar senha:</span>
          <input
            type="password"
            placeholder="Confirme a senha do usuário"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {!loading && (
          <button className="btn" type="submit">
            Cadastrar
          </button>
        )}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
