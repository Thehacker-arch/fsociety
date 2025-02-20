"use client";
import Link from 'next/link'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../context/auth";



export default function Header() {
    const isAuthenticated = useAuth();
    return (
        <header className="text-gray-400 bg-black body-font">
            <div className="container mx-auto flex flexWrap p-5 flex-col md:flex-row items-center">
                <Link href="/" className="flex title-font font-medium items-center textWhite mb-4 md:mb-0">
                    <span className="ml-3 text-xl font-semibold hover:text-white">fsociety</span>
                </Link>
                <nav className="md:ml-auto flex flexWrap items-center text-base justify-center">

                    {isAuthenticated ? (
                        <>
                            <Link href="/profile" className="mr-5 hover:text-white">
                                <FontAwesomeIcon icon={faUser} className="w-5 h-5" />Profile
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="mr-5 hover:text-white">
                                <FontAwesomeIcon icon={faSignInAlt} className="w-5 h-5" />Login
                            </Link>

                            <Link href="/signup" className="mr-5 hover:text-white">
                                <FontAwesomeIcon icon={faUserPlus} className="w-5 h-5" />SignUp
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    )
}
