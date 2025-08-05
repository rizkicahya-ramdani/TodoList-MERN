import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", { email, password });
            const token = res.data.token;

            localStorage.setItem("token", token);
            setErrorMsg("");
            navigate("/");
        } catch (error: any) {
            setErrorMsg(error.response?.data?.message || "Login gagal.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMsg && (
                        <p className="text-red-500 text-sm text-center">{errorMsg}</p>
                    )}

                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-center mt-4">
                    Belum punya akun?{" "}
                    <a href="/register" className="text-blue-600 hover:underline">
                        Daftar di sini
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;