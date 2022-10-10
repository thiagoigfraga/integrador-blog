import { db } from '../firebase/config';

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from 'firebase/auth';
import { useState, useEffect } from 'react';

export function useAuthentication() {
    const [authError, setAuthError] = useState('');
    const [loading, setLoading] = useState('');
    const [cancelled, setCancelled] = useState('');

    const auth = getAuth();

    const checkIfIsCancelled = () => {
        if (cancelled) {
            return;
        }
    };

    const createUser = async (data) => {
        checkIfIsCancelled();

        setLoading(true);

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user, { displayName: data.displayName });

            return user;
        } catch (error) {
            let systemErrorMessage;

            if (error.message.includes('Password')) {
                systemErrorMessage =
                    'A senha precisa conter pelo menos 6 caracteres.';
            } else if (error.message.includes('email-already')) {
                systemErrorMessage = 'E-mail já cadastrado.';
            } else {
                systemErrorMessage =
                    'Ocorreu um erro, por favor tenta mais tarde.';
            }

            setAuthError(systemErrorMessage);
        }
        setLoading(false);
    };

    const logout = () => {
        checkIfIsCancelled();
        signOut(auth);
    };

    const signIn = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setAuthError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
        } catch (error) {
            let systemErrorMessage;

            if (error.message.includes('user-not-found')) {
                systemErrorMessage = 'Usuário não encontrado.';
            } else if (error.message.includes('wrong-password')) {
                systemErrorMessage = 'Senha incorreta.';
            } else {
                systemErrorMessage =
                    'Ocorreu um erro, por favor tenta mais tarde.';
            }

            setAuthError(systemErrorMessage);
        }
        setLoading(false);
    };

    useEffect(() => {
        setCancelled(true);
    }, []);

    return { createUser, loading, authError, auth, logout, signIn };
}
