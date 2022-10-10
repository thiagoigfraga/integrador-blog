import { useEffect, useState } from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';
import styles from './Login.module.scss';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { authError, loading, signIn } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        const user = {
            email: email,
            password: password,
        };

        await signIn(user);
    };

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);

    return (
        <div className={styles.login}>
            <h1>Entre para postar!</h1>
            <p>Logue em seu usuário e compartilhe suas histórias</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Email:</span>
                    <input
                        type="mail"
                        placeholder="Email do usuário"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                {!loading && (
                    <button className="btn" type="submit">
                        Entrar
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
