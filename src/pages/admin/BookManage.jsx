import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { baseurl } from "../../services/BaseUrl";
import toast from "react-hot-toast";
import { Link } from "react-router";

const inputClass =
  "mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

const labelClass = "mb-3 block text-sm font-medium text-gray-700";

const BookManage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [total_copies, setTotalCopies] = useState(1);

  const { accessToken } = useContext(AuthContext);
  const [books, setBooks] = useState([]);

  const handleDelete = async (id) => {
    // 1. create a promise that resolves when the user picks an option
    const confirmed = await new Promise((resolve) => {
      toast(
        (t) => (
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-stone-800">
              Do you want to delete this book?
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(false);
                }}
                className="rounded-md border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  toast.dismiss(t.id);
                  resolve(true);
                }}
                className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ),
        { duration: Infinity } // stay open until the user chooses
      );
    });

    // 2. cancel: stop here, nothing is deleted
    if (!confirmed) return;

    // 3. ok: delete the book
    try {
      const res = await fetch(`${baseurl}/admin/deletebook/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json().catch(() => null);

      if (res.ok) {
        toast.success(data?.message || "Book deleted.");
        fetcAllBook();
      } else {
        toast.error(data?.detail || data?.message || "Could not delete the book.");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const fetcAllBook = async()=>
  {
    const res = await fetch(`${baseurl}/books/all`);
    const bookdata =await res.json();
    if(res.ok)
    {
        setBooks(bookdata);
    }
  }
  useState(() => {
    fetcAllBook();
      
  }, [fetcAllBook]);

  console.log(books);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);

    // Reset form
    setTitle("");
    setAuthor("");
    setCategory("");
    setDescription("");
    setPrice(0);
    setTotalCopies(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    const book = {
      title,
      author,
      category,
      description,
      price: Number(price),
      total_copies: Number(total_copies),
    };

    try {
      const res = await fetch(`${baseurl}/admin/createbook`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data?.message || "Book created successfully");
        closeModal();
      } else {
        toast.error(data?.message || "Failed to create book");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-6">
      <div className="flex items-center justify-between py-6">
        <h2 className="text-xl font-semibold text-gray-900">Manage books</h2>

        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add book
        </button>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
          onClick={closeModal}
        >
          <div
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-book-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              id="add-book-title"
              className="mb-4 text-lg font-semibold text-gray-900"
            >
              Add book
            </h3>

            <form onSubmit={handleSubmit}>
              <label className={labelClass}>
                Title
                <input
                  className={inputClass}
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  autoFocus
                />
              </label>

              <label className={labelClass}>
                Author
                <input
                  className={inputClass}
                  type="text"
                  name="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </label>

              <label className={labelClass}>
                Category
                <input
                  className={inputClass}
                  type="text"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </label>

              <label className={labelClass}>
                Description
                <textarea
                  className={`${inputClass} resize-y`}
                  name="description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>

              <div className="flex gap-3">
                <label className={`${labelClass} flex-1`}>
                  Price
                  <input
                    className={inputClass}
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </label>

                <label className={`${labelClass} flex-1`}>
                  Total copies
                  <input
                    className={inputClass}
                    type="number"
                    name="total_copies"
                    min="1"
                    step="1"
                    value={total_copies}
                    onChange={(e) => setTotalCopies(e.target.value)}
                    required
                  />
                </label>
              </div>

              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Saving…" : "Save book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        {/* Horizontal scroll for small screens */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table Head */}
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  #
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Book
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Author
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Category
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Price
                </th>

                <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Copies
                </th>

                <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>

                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200 bg-white">
              {books.length > 0 ? (
                books.map((book, index) => (
                  <tr key={book.id || index} className="hover:bg-gray-50">
                    {/* Number */}
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {index + 1}
                    </td>

                    {/* Book */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* Cover */}
                        <div className="flex h-12 w-10 items-center justify-center overflow-hidden rounded bg-gray-100">
                          {book.cover_image ? (
                            <img
                              src={book.cover_image}
                              alt={book.title}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-xs text-gray-400">
                              No image
                            </span>
                          )}
                        </div>

                        {/* Title + Description */}
                        <div className="max-w-xs">
                          <p className="font-medium text-gray-900">
                            {book.title}
                          </p>

                          <p className="mt-1 truncate text-xs text-gray-500">
                            {book.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Author */}
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                      {book.author}
                    </td>

                    {/* Category */}
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                        {book.category || "N/A"}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                      ${book.price ?? 0}
                    </td>

                    {/* Copies */}
                    <td className="whitespace-nowrap px-6 py-4 text-center text-sm text-gray-700">
                      {book.total_copies}
                    </td>

                    {/* Status */}
                    <td className="whitespace-nowrap px-6 py-4 text-center">
                      {book.total_copies > 0 ? (
                        <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                          Available
                        </span>
                      ) : (
                        <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                          Out of stock
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link to={`/admin/edit-book/${book?.id}`}
                          type="button"
                          className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() => handleDelete(book.id)}
                          className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600
                                hover:bg-red-100"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                /* Empty State */
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <p className="text-sm font-medium text-gray-900">
                      No books found
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      Add your first book to get started.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookManage;
