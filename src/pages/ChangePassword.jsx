import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { baseurl } from "../services/BaseUrl";
import { AuthContext } from "../context/AuthProvider";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { authUser, accessToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const changepassdata = {
      current_password: currentPassword,
      new_password: newPassword,
    };
    const res = await fetch(`${baseurl}/passwordchange`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(changepassdata),
    });
    const data = await res.json();
    if (data) {
      toast.success(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Card */}
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl shadow-indigo-100/50 border border-slate-100">
          {/* Gradient Header */}
          <div className="h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_50%)]" />

            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle, white 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />
          </div>

          {/* Lock Icon */}
          <div className="px-6 sm:px-8 pb-8">
            <div className="-mt-14">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-300/50 ring-4 ring-white">
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <rect x="5" y="10" width="14" height="10" rx="2" />

                  <path strokeLinecap="round" d="M8 10V7a4 4 0 018 0v3" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <div className="mt-5">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Change Password
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Update your password to keep your account secure.
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="mt-6 bg-white rounded-3xl shadow-xl shadow-slate-100/60 border border-slate-100 overflow-hidden">
          {/* Form Header */}
          <div className="px-6 sm:px-8 py-6 border-b border-slate-100 bg-gradient-to-r from-slate-50/50 to-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">Security</h2>

                <p className="text-xs text-slate-500">
                  Choose a strong and secure password
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Current Password */}
            <PasswordField
              label="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              showPassword={showCurrentPassword}
              setShowPassword={setShowCurrentPassword}
              placeholder="Enter your current password"
            />

            {/* New Password */}
            <PasswordField
              label="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              showPassword={showNewPassword}
              setShowPassword={setShowNewPassword}
              placeholder="Enter your new password"
            />

            {/* Password Requirements */}
            <div className="rounded-xl bg-slate-50 border border-slate-100 p-4">
              <p className="text-xs font-semibold text-slate-600 mb-3">
                Password requirements
              </p>

              <ul className="text-xs text-slate-500 space-y-2">
                <li className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      newPassword.length >= 8
                        ? "bg-emerald-500"
                        : "bg-slate-300"
                    }`}
                  />
                  At least 8 characters
                </li>

                <li className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      /[A-Z]/.test(newPassword)
                        ? "bg-emerald-500"
                        : "bg-slate-300"
                    }`}
                  />
                  One uppercase letter
                </li>

                <li className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      /[0-9]/.test(newPassword)
                        ? "bg-emerald-500"
                        : "bg-slate-300"
                    }`}
                  />
                  One number
                </li>
              </ul>
            </div>

            {/* Button */}
            <div className="flex pt-2 border-t border-slate-100">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating Password...
                  </>
                ) : (
                  <>
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Update Password
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-400 mt-6">
          For your security, never share your password with anyone.
        </p>
      </div>
    </div>
  );
};

/* Password Field */
const PasswordField = ({
  label,
  value,
  onChange,
  showPassword,
  setShowPassword,
  placeholder,
}) => {
  return (
    <div className="group">
      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">
        {label}
      </label>

      <div className="relative">
        {/* Lock Icon */}
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <rect x="5" y="10" width="14" height="10" rx="2" />

            <path strokeLinecap="round" d="M8 10V7a4 4 0 018 0v3" />
          </svg>
        </div>

        {/* Input */}
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 rounded-xl text-sm font-medium bg-white text-slate-900 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 hover:border-slate-300 outline-none transition-all duration-200 placeholder:text-slate-400"
        />

        {/* Show / Hide Password */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-600 transition-colors"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3l18 18"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.58 10.58a2 2 0 002.83 2.83"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.88 4.24A9.77 9.77 0 0112 4c5 0 8.73 4.11 9.8 8a11.9 11.9 0 01-2.05 3.89"
              />

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.61 6.61C4.62 7.83 3.21 9.77 2.2 12c1.07 3.89 4.8 8 9.8 8 1.61 0 3.1-.4 4.4-1.09"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.2 12C3.27 8.11 7 4 12 4s8.73 4.11 9.8 8c-1.07 3.89-4.8 8-9.8 8s-8.73-4.11-9.8-8z"
              />

              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
