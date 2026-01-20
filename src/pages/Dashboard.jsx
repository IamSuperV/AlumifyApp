import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user, logout, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [user, loading, navigate]);

    if (loading) return <div className="text-white text-center mt-20">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
                <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-700">
                    <h1 className="text-3xl font-bold">User Dashboard</h1>
                    <button
                        onClick={logout}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition duration-200"
                    >
                        Logout
                    </button>
                </header>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl mb-4">Welcome back, {user?.name}!</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gray-700 p-4 rounded">
                            <h3 className="font-semibold text-gray-300 mb-2">Profile Info</h3>
                            <p>Email: {user?.email}</p>
                            <p>Role: {user?.role}</p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded">
                            <h3 className="font-semibold text-gray-300 mb-2">Account Status</h3>
                            <p className="text-green-400">Active</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
