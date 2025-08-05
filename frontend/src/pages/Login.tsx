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
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-violet-700">
                    Selamat Datang!
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {errorMsg && (
                        <p className="text-red-500 text-sm text-center">{errorMsg}</p>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Masukkan Username"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Masukkan Password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200"
                    >
                        Masuk
                    </button>
                </form>

                <p className="text-sm text-center mt-5 text-gray-600">
                    Belum punya akun?{" "}
                    <a href="/register" className="text-violet-600 hover:underline font-medium">
                        Daftar di sini
                    </a>
                </p>
            </div>
        </div>

    );
};

export default Login;