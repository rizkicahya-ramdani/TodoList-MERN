import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import TaskPage from './pages/TaskPage';

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>; // Atau tampilkan spinner
    }

    return user ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
                path="/"
                element={
                    <PrivateRoute>
                        <TaskPage />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}

export default App;