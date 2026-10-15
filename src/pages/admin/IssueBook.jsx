import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthProvider";
import { baseurl } from "../../services/BaseUrl";

const inputClass =
  "block w-full rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-stone-900 " +
  "placeholder:text-stone-400 focus:border-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-700/25 " +
  "disabled:cursor-not-allowed disabled:bg-stone-100";

const Field = ({ label, htmlFor, hint, children }) => (
  <div>
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-medium text-stone-800"
    >
      {label}
    </label>
    {children}
    {hint && <p className="mt-1.5 text-sm text-stone-500">{hint}</p>}
  </div>
);

const IssueBook = () => {
  const [bookId, setBookId] = useState("");
  const [userId, setUserId] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleReset = () => {
    setBookId("");
    setUserId("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookId || !userId) return;

    setSaving(true);
    setError("");

    const payload = {
      book_id: Number(bookId),
      user_id: Number(userId),
    };

    try {
      const res = await fetch(`${baseurl}/admin/create_issue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (res.ok) {
        toast.success(data?.message || "Book issued.");
        handleReset();
      } else {
        const msg = data?.detail || data?.message || "Could not issue the book.";
        const text = typeof msg === "string" ? msg : JSON.stringify(msg);
        setError(text);
        toast.error(text);
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-stone-900">Issue book</h1>
        <p className="mt-1 text-stone-600">
          Enter the book and the member it is being issued to.
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
      >
        {error && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
          >
            {error}
          </div>
        )}

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Book ID" htmlFor="book_id">
            <input
              id="book_id"
              name="book_id"
              type="number"
              min="1"
              step="1"
              required
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              placeholder="e.g. 12"
              className={inputClass}
            />
          </Field>

          <Field label="User ID" htmlFor="user_id">
            <input
              id="user_id"
              name="user_id"
              type="number"
              min="1"
              step="1"
              required
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="e.g. 5"
              className={inputClass}
            />
          </Field>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-stone-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={handleReset}
            disabled={saving}
            className="text-sm font-medium text-stone-600 underline-offset-4 hover:text-stone-900 hover:underline disabled:opacity-50"
          >
            Clear form
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={saving}
              className="flex-1 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-teal-700/25 disabled:opacity-50 sm:flex-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-teal-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-700/40 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
            >
              {saving ? "Issuing…" : "Issue book"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default IssueBook;