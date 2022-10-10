import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer/Footer';
import { NavBar } from './components/NavBar/NavBar';
import { AuthContextProvider } from './contexts/AuthContext';
import { About } from './pages/About/About';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';

import { onAuthStateChanged } from 'firebase/auth';
import { useAuthentication } from './hooks/useAuthentication';
import { NewPost } from './pages/Posts/NewPost';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Search } from './pages/Search/Search';
import { Post } from './pages/Post/Post';
import { EditPost } from './pages/EditPost/EditPost';

<Dashboard></Dashboard>;

export function App() {
    const [user, setUser] = useState(undefined);

    const { auth } = useAuthentication();

    const loadingUser = user === undefined;

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        });
    }, [auth]);

    if (loadingUser) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <AuthContextProvider value={{ user }}>
                <BrowserRouter>
                    <NavBar />
                    <div className="container">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route
                                path="/login"
                                element={
                                    !user ? <Login /> : <Navigate to="/" />
                                }
                            />
                            <Route path="/search" element={<Search />} />
                            <Route
                                path="/register"
                                element={
                                    !user ? <Register /> : <Navigate to="/" />
                                }
                            />
                            <Route path="/posts/:id" element={<Post />} />
                            <Route
                                path="posts/create"
                                element={
                                    user ? (
                                        <NewPost />
                                    ) : (
                                        <Navigate to="/login" />
                                    )
                                }
                            />
                            <Route
                                path="posts/edit/:id"
                                element={
                                    user ? (
                                        <EditPost />
                                    ) : (
                                        <Navigate to="/login" />
                                    )
                                }
                            />
                            <Route
                                path="/dashboard"
                                element={
                                    user ? (
                                        <Dashboard />
                                    ) : (
                                        <Navigate to="/login" />
                                    )
                                }
                            />
                        </Routes>
                    </div>
                </BrowserRouter>
                <Footer />
            </AuthContextProvider>
        </div>
    );
}
