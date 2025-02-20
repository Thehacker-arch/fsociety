"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

type FormData = {
    name: string;
    email: string;
    password: string;
    username: string;
}

export default function Signup() {
    const { register, handleSubmit } = useForm<FormData>();
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const isAuthenticated = useAuth();
    
    useEffect(() => {
        if (isAuthenticated) {
            router.push('/')
        }
    }, [isAuthenticated, router]);
    
    if (isAuthenticated) {
        return null;
    }  

    const onSubmit = async(data: FormData) => {
        setError(null);
        try
        {
            const response = await axios.post('http://127.0.0.1:8000/auth/signup', data, {
                withCredentials: true
            });
    
            if (response.status == 200) {
                router.push('/login')
            }
        }
        catch (err: any)
        {
            setError(err.response?.data?.message || "Login failed");
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-neutral-950">
            <div className="container px-5 py-24 flex flex-col lg:flex-row items-center justify-center gap-12 transition-all duration-300 border-sky-700 rounded-2xl shadow-xl shadow-gray-600/30 ring-1 ring-gray-600">
                
                {/* Text Section */}
                <div className="lg:w-1/2 text-center lg:text-left">
                    <h1 className="title-font font-medium text-4xl text-white">
                        Sign up on <span className="font-bold text-sky-400">fsociety</span>
                    </h1>
                    <p className="leading-relaxed mt-4 text-cyan-200 text-lg">
                        Join a community that values your voice. Your journey starts here.
                    </p>
                </div>

                {/* Signup Form Section */}
                <div className="lg:w-1/3 w-full max-w-md bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-opacity-90 rounded-3xl p-8 flex flex-col shadow-2xl transition-all duration-300 hover:shadow-gray-700 border border-gray-600">
                    <h2 className="text-white text-lg font-bold title-font mb-5">Sign Up</h2>            
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative mb-4">
                            <label htmlFor="username" className="leading-7 text-sm text-gray-400">Username</label>
                            <input
                            type="username"
                            {...register("username")}
                            className="w-full bg-gray-700 bg-opacity-40 focus:bg-gray-800 focus:ring-2 focus:ring-indigo-500 rounded-xl border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-2 px-4 leading-8 transition-all duration-200 ease-in-out shadow-md"
                            required
                            />
                        </div>

                        <div className="relative mb-4">
                            <label htmlFor="full_name" className="leading-7 text-sm text-gray-400">Full Name</label>
                            <input
                            type="name"
                            {...register("name")}
                            className="w-full bg-gray-700 bg-opacity-40 focus:bg-gray-800 focus:ring-2 focus:ring-indigo-500 rounded-xl border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-2 px-4 leading-8 transition-all duration-200 ease-in-out shadow-md"
                            required
                            />
                        </div>

                        <div className="relative mb-4">
                            <label htmlFor="email" className="leading-7 text-sm text-gray-400">Email</label>
                            <input
                            type="email"
                            {...register("email")}
                            className="w-full bg-gray-700 bg-opacity-40 focus:bg-gray-800 focus:ring-2 focus:ring-indigo-500 rounded-xl border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-2 px-4 leading-8 transition-all duration-200 ease-in-out shadow-md"
                            required
                            />
                        </div>

                        <div className="relative mb-4">
                            <label htmlFor="password" className="leading-7 text-sm text-gray-400">Password</label>
                            <input
                            type="password"
                            {...register("password")}
                            className="w-full bg-gray-700 bg-opacity-40 focus:bg-gray-800 focus:ring-2 focus:ring-indigo-500 rounded-xl border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-2 px-4 leading-8 transition-all duration-200 ease-in-out shadow-md"
                            required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full text-white bg-slate-900 border-0 py-2 px-8 focus:outline-none hover:bg-sky-950 rounded-xl text-lg shadow-md shadow-sky-800 transition-all duration-300">
                        Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
