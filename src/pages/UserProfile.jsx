import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { baseurl } from '../services/BaseUrl';
import toast from 'react-hot-toast';

const UserProfile = () => {
    const { authUser, accessToken } = useContext(AuthContext);

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (authUser) {
            setFirstName(authUser.firstname || '');
            setLastname(authUser.lastname || '');
            setUsername(authUser.username || '');
            setEmail(authUser.email || '');
        }
    }, [authUser]);

    const savedata = async (e) => {
        e.preventDefault();

        const data = {
            firstname,
            lastname,
            username,
            email,
        };
        const res = await fetch(`${baseurl}/updateuser`,{
            method:"PUT",
            headers:{
                "Content-type":"application/json",
                Authorization:`Bearer ${accessToken}`
            },
            body:JSON.stringify(data)
        })
        resdata = await res.json()
       if(resdata)
       {
        toast.success(resdata.message);
       }
    };

    if (!authUser) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                    <p className="text-sm text-slate-500 font-medium">
                        Loading profile...
                    </p>
                </div>
            </div>
        );
    }

    const initials = `${authUser.firstname?.[0] || ''}${authUser.lastname?.[0] || ''}`.toUpperCase();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

                <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-indigo-100/50 border border-slate-100">

                    <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_50%)]" />

                        <div
                            className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                                backgroundSize: '20px 20px',
                            }}
                        />
                    </div>

                    <div className="px-6 sm:px-8 pb-8">
                        <div className="-mt-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                            <div className="flex flex-col sm:flex-row sm:items-end gap-4">

                                <div className="relative">
                                    <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-indigo-300/50 ring-4 ring-white">
                                        {initials}
                                    </div>

                                    <span
                                        className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full ring-4 ring-white ${
                                            authUser.is_active
                                                ? 'bg-emerald-500'
                                                : 'bg-slate-400'
                                        }`}
                                    >
                                        {authUser.is_active && (
                                            <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-75" />
                                        )}
                                    </span>
                                </div>

                                <div className="pb-1">
                                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                                        {authUser.firstname} {authUser.lastname}
                                    </h1>

                                    <p className="text-sm text-slate-500 mt-0.5">
                                        @{authUser.username}
                                    </p>

                                    <div className="flex items-center gap-2 mt-2">
                                        <span
                                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                                                authUser.role === 'admin'
                                                    ? 'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 ring-1 ring-rose-200'
                                                    : 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 ring-1 ring-indigo-200'
                                            }`}
                                        >
                                            <svg
                                                className="w-3 h-3"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 1l3 6 6 .9-4.5 4.3 1 6.3L10 15.8 4.5 18.5l1-6.3L1 7.9 7 7l3-6z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {authUser.role}
                                        </span>

                                        <span
                                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                authUser.is_active
                                                    ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
                                                    : 'bg-slate-100 text-slate-600 ring-1 ring-slate-200'
                                            }`}
                                        >
                                            <span
                                                className={`w-1.5 h-1.5 rounded-full ${
                                                    authUser.is_active
                                                        ? 'bg-emerald-500'
                                                        : 'bg-slate-400'
                                                }`}
                                            />
                                            {authUser.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 bg-white rounded-3xl shadow-xl shadow-slate-100/60 border border-slate-100 overflow-hidden">

                    <div className="px-6 sm:px-8 py-6 border-b border-slate-100 bg-gradient-to-r from-slate-50/50 to-white">
                        <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                                <svg
                                    className="w-5 h-5 text-indigo-600"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    Personal Information
                                </h2>

                                <p className="text-xs text-slate-500">
                                    Manage your account details
                                </p>
                            </div>
                        </div>
                    </div>

                    <form
                        onSubmit={savedata}
                        className="p-6 sm:p-8 space-y-5"
                    >

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            <Field
                                label="First Name"
                                name="firstname"
                                value={firstname}
                                onChange={(e) => setFirstName(e.target.value)}
                                icon={
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                }
                            />

                            <Field
                                label="Last Name"
                                name="lastname"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                                icon={
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                }
                            />

                        </div>

                        <Field
                            label="Username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            icon={
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                    />
                                </svg>
                            }
                        />

                        <Field
                            label="Email Address"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            icon={
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            }
                        />

                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">

                            <button
                                type="submit"
                                className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                Save Changes
                            </button>

                        </div>

                    </form>
                </div>

                <p className="text-center text-xs text-slate-400 mt-6">
                    Your information is securely stored and never shared.
                </p>

            </div>
        </div>
    );
};

const Field = ({
    label,
    name,
    value,
    onChange,
    disabled = false,
    type = 'text',
    icon,
}) => {
    return (
        <div className="group">

            <label
                htmlFor={name}
                className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2"
            >
                {label}
            </label>

            <div className="relative">

                {icon && (
                    <div
                        className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                            disabled
                                ? 'text-slate-300'
                                : 'text-slate-400 group-focus-within:text-indigo-500'
                        }`}
                    >
                        {icon}
                    </div>
                )}

                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`w-full ${
                        icon ? 'pl-10' : 'pl-4'
                    } pr-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 outline-none border ${
                        disabled
                            ? 'bg-slate-50 text-slate-500 border-slate-100 cursor-not-allowed'
                            : 'bg-white text-slate-900 border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 hover:border-slate-300'
                    }`}
                />

            </div>
        </div>
    );
};

export default UserProfile;