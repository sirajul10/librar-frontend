import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../../context/AuthProvider";
import { baseurl } from "../../services/BaseUrl";
import toast from "react-hot-toast";

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

const EditBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [total_copies, setTotalCopies] = useState(1);
  const [available_copies, setAvailableCopies] = useState(0);
  const { authUser, accessToken } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Puts a book's values into the form fields
  const fillForm = (b) => {
    setTitle(b?.title ?? "");
    setAuthor(b?.author ?? "");
    setCategory(b?.category ?? "");
    setDescription(b?.description ?? "");
    setPrice(b?.price ?? 0);
    setTotalCopies(b?.total_copies ?? 1);
    setAvailableCopies(b?.available_copies ?? 0);
  };

  const fetchBook = async () => {
    if (!id || !accessToken) return; // wait until the token is available
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${baseurl}/books/${id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const result = await res.json().catch(() => null);
      console.log("book response:", res.status, result);

      if (res.ok) {
        // handles { book: {...} }, { data: {...} } or the book itself
        const b = result?.book ?? result?.data ?? result;
        setBook(b);
        fillForm(b);
      } else {
        setError(
          result?.message ||
            result?.detail ||
            `Could not load this book (status ${res.status}).`
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Load the existing book and use it as the default values
  useEffect(() => {
    fetchBook();
  }, [id, accessToken]);

  // Restore the fields to the last loaded/saved values
  const handleReset = () => {
    setSuccess("");
    setError("");
    fillForm(book);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Number(available_copies) > Number(total_copies)) {
      toast.error("Available copies can't be more than total copies.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      title,
      author,
      category,
      description,
      price: Number(price),
      total_copies: Number(total_copies),
      available_copies: Number(available_copies),
    };

    const res = await fetch(`${baseurl}/admin/updatebook/${id}`,{
        method:"PUT",
        headers:{
            Authorization:`Bearer ${accessToken}`,
            'Content-Type':'application/json',
        },
        body:JSON.stringify(payload)
    })
    const data = await res.json();
    if(res.ok)
    {
        toast.success(data.message);
        navigate('/admin/book-manage');
    }
    else{
        toast.error(data.detail)
    }
   
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10" aria-busy="true">
        <div className="h-8 w-48 animate-pulse rounded bg-stone-200" />
        <div className="mt-8 space-y-6 rounded-2xl border border-stone-200 bg-white p-6">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-11 animate-pulse rounded-lg bg-stone-100"
            />
          ))}
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10">
        <div
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800"
        >
          {error || "This book could not be found."}
        </div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-4 text-sm font-medium text-teal-800 underline underline-offset-4"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-stone-900">Edit book</h1>
        <p className="mt-1 text-stone-600">
          Update the details for{" "}
          <span className="font-medium text-stone-800">{book.title}</span>.
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
        {success && (
          <div
            role="status"
            className="rounded-lg border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900"
          >
            {success}
          </div>
        )}

        <Field label="Title" htmlFor="title">
          <input
            id="title"
            name="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
          />
        </Field>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Author" htmlFor="author">
            <input
              id="author"
              name="author"
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field label="Category" htmlFor="category">
            <input
              id="category"
              name="category"
              type="text"
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={inputClass}
            />
          </Field>
        </div>

        <Field label="Description" htmlFor="description">
          <textarea
            id="description"
            name="description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`${inputClass} resize-y`}
          />
        </Field>

        <div className="grid gap-6 sm:grid-cols-3">
          <Field label="Price" htmlFor="price">
            <div className="relative">
              <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-stone-500">
                $
              </span>
              <input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`${inputClass} pl-8`}
              />
            </div>
          </Field>

          <Field
            label="Total copies"
            htmlFor="total_copies"
            hint="At least 1 copy."
          >
            <input
              id="total_copies"
              name="total_copies"
              type="number"
              min="1"
              step="1"
              required
              value={total_copies}
              onChange={(e) => setTotalCopies(e.target.value)}
              className={inputClass}
            />
          </Field>

          <Field
            label="Available copies"
            htmlFor="available_copies"
            hint="Can't exceed total."
          >
            <input
              id="available_copies"
              name="available_copies"
              type="number"
              min="0"
              max={total_copies}
              step="1"
              required
              value={available_copies}
              onChange={(e) => setAvailableCopies(e.target.value)}
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
            Reset to saved values
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
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditBook;