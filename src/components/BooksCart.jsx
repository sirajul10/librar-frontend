import React from "react";
import { Link } from "react-router";

const BooksCart = ({book}) => {
  return (
    <div className="card bg-base-100 w-full max-w-sm overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
  {/* Book Cover */}
  <figure className="relative h-72 overflow-hidden bg-base-200">
    <img
      src={
        book.cover_image ||
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80"
      }
      alt={book.title}
      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
    />

    {/* Category */}
    <div className="absolute left-4 top-4">
      <span className="badge badge-primary font-medium shadow-md">
        {book.category}
      </span>
    </div>

    {/* Availability */}
    <div className="absolute right-4 top-4">
      {book.available_copies > 0 ? (
        <span className="badge badge-success text-white shadow-md">
          Available
        </span>
      ) : (
        <span className="badge badge-error text-white shadow-md">
          Out of Stock
        </span>
      )}
    </div>
  </figure>

  {/* Card Body */}
  <div className="card-body gap-3">
    <div>
      <h2 className="card-title text-xl font-bold">
        {book.title}
      </h2>

      <p className="text-sm text-base-content/60">
        by {book.author}
      </p>
    </div>

    <p className="line-clamp-3 text-sm leading-6 text-base-content/70">
      {book.description}
    </p>

    {/* Book Info */}
    <div className="flex items-center justify-between border-t border-base-200 pt-4">
      <div>
        <p className="text-xs text-base-content/50">Price</p>
        <p className="text-xl font-bold text-primary">
          ৳{book.price}
        </p>
      </div>

      <div className="text-right">
        <p className="text-xs text-base-content/50">
          Copies available
        </p>
        <p className="font-semibold">
          {book.available_copies} / {book.total_copies}
        </p>
      </div>
    </div>

    {/* Action */}
    <div className="card-actions mt-2">
        <Link className="btn btn-primary w-full" to={`/books/${book.id}`}>Book Deatils</Link>
     
    </div>
  </div>
</div>
  );
};

export default BooksCart;
