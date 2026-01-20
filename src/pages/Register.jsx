import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Account</h2>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-300 mb-2">Full Name</label>
                        <input
                            type="text"
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2">Email Address</label>
                        <input
                            type="email"
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-400 hover:text-blue-300">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
