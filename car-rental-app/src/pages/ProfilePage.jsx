import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/apiClient';
import Navbar from '../components/common/Navbar';

export default function ProfilePage() {
    const { user, refreshUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        username: '',
        role: ''
    });

    const [passwordData, setPasswordData] = useState({
        old_password: '',
        new_password: '',
        confirm_new_password: ''
    });

    const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });
    const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });
    const [savingProfile, setSavingProfile] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/api/auth/me/');
            setProfileData({
                first_name: response.data.first_name || '',
                last_name: response.data.last_name || '',
                phone_number: response.data.phone_number || '',
                email: response.data.email || '',
                username: response.data.username || '',
                role: response.data.role || ''
            });
        } catch (error) {
            console.error('Failed to fetch profile:', error);
            setProfileMessage({ type: 'error', text: 'Failed to load profile data.' });
        } finally {
            setLoading(false);
        }
    };

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setSavingProfile(true);
        setProfileMessage({ type: '', text: '' });

        try {
            await apiClient.patch('/api/auth/me/', {
                first_name: profileData.first_name,
                last_name: profileData.last_name,
                phone_number: profileData.phone_number
            });
            
            setProfileMessage({ type: 'success', text: 'Profile updated successfully!' });
            await refreshUser();
        } catch (error) {
            console.error('Profile update failed:', error);
            setProfileMessage({ 
                type: 'error', 
                text: error.response?.data?.detail || 'Failed to update profile.' 
            });
        } finally {
            setSavingProfile(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setSavingPassword(true);
        setPasswordMessage({ type: '', text: '' });

        // Client-side validation
        if (passwordData.new_password !== passwordData.confirm_new_password) {
            setPasswordMessage({ type: 'error', text: 'New passwords do not match.' });
            setSavingPassword(false);
            return;
        }

        if (passwordData.new_password.length < 8) {
            setPasswordMessage({ type: 'error', text: 'Password must be at least 8 characters.' });
            setSavingPassword(false);
            return;
        }

        try {
            await apiClient.put('/api/auth/password/change/', passwordData);
            
            setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
            setPasswordData({
                old_password: '',
                new_password: '',
                confirm_new_password: ''
            });
        } catch (error) {
            console.error('Password change failed:', error);
            const errorMsg = error.response?.data?.old_password?.[0] 
                || error.response?.data?.new_password?.[0]
                || error.response?.data?.detail 
                || 'Failed to change password.';
            setPasswordMessage({ type: 'error', text: errorMsg });
        } finally {
            setSavingPassword(false);
        }
    };

    if (loading) {
        return (
            <>
                <Navbar currentPage="profile" />
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-gray-100 border-t-gray-900 rounded-full animate-spin"></div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar currentPage="profile" />
            <div className="min-h-screen bg-gray-50 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tight mb-2">
                            My Profile
                        </h1>
                        <p className="text-gray-500">Manage your personal information and security settings</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Personal Information Card */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center">
                                    <i className="fi fi-rr-user text-white text-xl"></i>
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                                        Personal Info
                                    </h2>
                                    <p className="text-xs text-gray-400">Update your details</p>
                                </div>
                            </div>

                            <form onSubmit={handleProfileSubmit} className="space-y-4">
                                {/* Read-only fields */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        value={profileData.username}
                                        disabled
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-400 cursor-not-allowed"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={profileData.email}
                                        disabled
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-400 cursor-not-allowed"
                                    />
                                </div>

                                {/* Editable fields */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={profileData.first_name}
                                        onChange={handleProfileChange}
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-gray-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={profileData.last_name}
                                        onChange={handleProfileChange}
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-gray-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone_number"
                                        value={profileData.phone_number}
                                        onChange={handleProfileChange}
                                        placeholder="+1234567890"
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-gray-900"
                                    />
                                </div>

                                {profileMessage.text && (
                                    <div className={`p-4 rounded-xl text-sm font-bold ${
                                        profileMessage.type === 'success' 
                                            ? 'bg-green-50 text-green-700' 
                                            : 'bg-red-50 text-red-700'
                                    }`}>
                                        {profileMessage.text}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={savingProfile}
                                    className="w-full px-6 py-3 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {savingProfile ? 'Saving...' : 'Save Changes'}
                                </button>
                            </form>
                        </div>

                        {/* Security Card */}
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center">
                                    <i className="fi fi-rr-lock text-white text-xl"></i>
                                </div>
                                <div>
                                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight">
                                        Security
                                    </h2>
                                    <p className="text-xs text-gray-400">Change your password</p>
                                </div>
                            </div>

                            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        name="old_password"
                                        value={passwordData.old_password}
                                        onChange={handlePasswordChange}
                                        required
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-gray-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="new_password"
                                        value={passwordData.new_password}
                                        onChange={handlePasswordChange}
                                        required
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-gray-900"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-gray-900 uppercase tracking-widest mb-2">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        name="confirm_new_password"
                                        value={passwordData.confirm_new_password}
                                        onChange={handlePasswordChange}
                                        required
                                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:border-gray-900"
                                    />
                                </div>

                                {passwordMessage.text && (
                                    <div className={`p-4 rounded-xl text-sm font-bold ${
                                        passwordMessage.type === 'success' 
                                            ? 'bg-green-50 text-green-700' 
                                            : 'bg-red-50 text-red-700'
                                    }`}>
                                        {passwordMessage.text}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={savingPassword}
                                    className="w-full px-6 py-3 bg-gray-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {savingPassword ? 'Updating...' : 'Change Password'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
