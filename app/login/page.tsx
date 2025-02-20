"use client";

import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type LoginForm = {
    email: string;
    password: string;
}

export default function Login() {
    const { register, handleSubmit } = useForm<LoginForm>();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const onSubmit = async (data: LoginForm) => {
        setError(null); // Clear previous errors
        try {
            const response = await axios.post("http://127.0.0.1:8000/auth/login", data, {
                withCredentials: true, // For cookies/session auth
            });

            if (response.status === 200) {
                router.push("/"); // Redirect on success
            }
        }
        catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="max-w-sm mx-auto p-6 bg-black rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Login</h2>

            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-opacity-90 rounded-3xl p-8 flex flex-col shadow-2xl transition-all duration-300 hover:shadow-gray-700 border border-gray-600">
                    <h1 className="title-font font-medium text-4xl text-white mb-5 text-center">
                        Login <span className="font-bold text-sky-400">fsociety</span>
                    </h1>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-cyan-50">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            className="w-full mt-1 p-2 border rounded"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-cyan-50">Password</label>
                        <input
                            type="password"
                            {...register("password")}
                            className="w-full mt-1 p-2 border rounded"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
