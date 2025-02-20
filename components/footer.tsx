import Link from 'next/link'
import React from 'react'

export default function Footer() {
    return (
        <footer className="text-gray-400 bg-black body-font text-center">
            <div className="container px-5 py-8 mx-auto flex flex-col sm:flex-row items-center justify-center">
                <Link href="/" className="flex title-font font-medium items-center text-white">
                    <span className="ml-3 text-xl">fsociety</span>
                </Link>
                <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800">
                    © 2025 fsociety
                </p>
            </div>
        </footer>
    )
}