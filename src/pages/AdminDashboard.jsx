import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const { user, logout, loading } = useAuth();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (!user || user.role !== 'admin') {
                navigate('/dashboard');
            } else {
                fetchUsers();
            }
        }
    }, [user, loading, navigate]);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/admin/users');
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await api.delete(`/admin/user/${id}`);
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user', error);
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-700">
                    <h1 className="text-3xl font-bold text-purple-400">Admin Dashboard</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded transition"
                        >
                            User View
                        </button>
                        <button
                            onClick={logout}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded transition"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl mb-6">User Management</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-700 text-gray-400">
                                    <th className="p-3">ID</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Role</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u._id} className="border-b border-gray-700 hover:bg-gray-750">
                                        <td className="p-3 font-mono text-sm text-gray-500">{u._id}</td>
                                        <td className="p-3">{u.name}</td>
                                        <td className="p-3">{u.email}</td>
                                        <td className="p-3">
                                            <span className={`px-2 py-1 rounded text-xs ${u.role === 'admin' ? 'bg-purple-900 text-purple-300' : 'bg-blue-900 text-blue-300'}`}>
                                                {u.role}
                                            </span>
                                        </td>
                                        <td className="p-3">
                                            <button
                                                onClick={() => handleDelete(u._id)}
                                                className="text-red-400 hover:text-red-300 transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
