import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Ambil fungsi login langsung dari context
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");
        setIsLoading(true);

        try {
            console.log('Attempting login with:', { email, password });
            await login({ email, password });
        } catch (error: any) {
            console.error('Login error details:', error);
            if (error.code === 'ERR_NETWORK') {
                setErrorMsg("Tidak dapat terhubung ke server. Pastikan backend berjalan di port 5000.");
            } else if (error.response?.status === 401) {
                setErrorMsg("Email atau password salah.");
            } else if (error.response?.data?.message) {
                setErrorMsg(error.response.data.message);
            } else {
                setErrorMsg("Login gagal. Periksa kembali email dan password Anda.");
            }
        } finally {
            setIsLoading(false);
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
                        disabled={isLoading}
                        className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 disabled:bg-violet-400"
                    >
                        {isLoading ? "Memproses..." : "Masuk"}
                    </button>
                </form>

                <p className="text-sm text-center mt-5 text-gray-600">
                    Belum punya akun?{" "}
                    <Link to="/register" className="text-violet-600 hover:underline font-medium">
                        Daftar di sini
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;