import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

const Register: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await api.post("/auth/register", { email, password });
            setSuccessMsg("Registrasi berhasil! Silakan login.");
            setErrorMsg("");
            setTimeout(() => navigate("/login"), 1500);
        } catch (error: any) {
            setErrorMsg(error.response?.data?.message || "Registrasi gagal.");
            setSuccessMsg("");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-violet-700">
                    Daftar Akun
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {errorMsg && (
                        <p className="text-red-500 text-sm text-center">{errorMsg}</p>
                    )}
                    {successMsg && (
                        <p className="text-green-600 text-sm text-center">{successMsg}</p>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Masukkan Email"
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
                        Daftar
                    </button>
                </form>

                <p className="text-sm text-center mt-5 text-gray-600">
                    Sudah punya akun?{" "}
                    <a href="/" className="text-violet-600 hover:underline font-medium">
                        Masuk di sini
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Register;
