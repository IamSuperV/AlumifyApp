import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
            <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Welcome to Alumify
            </h1>
            <p className="text-xl mb-8 text-gray-300">
                The premium platform for alumni connection.
            </p>
            <div className="space-x-4">
                <Link
                    to="/login"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition duration-300"
                >
                    Login
                </Link>
                <Link
                    to="/register"
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition duration-300"
                >
                    Register
                </Link>
            </div>
        </div>
    );
};

export default Home;
