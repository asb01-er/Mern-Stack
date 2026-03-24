"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import LoadingPage from "../loading";
import AddBook from "./AddBook";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const fetchBooks = async () => {
    const res = await fetch("/api/books");
    const data = await res.json();
    setBooks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/books/search?query=${query}`);
    const data = await res.json();
    setBooks(data);
    setLoading(false);
  };

  const deleteBook = async (id) => {
    await fetch(`/api/books/${id}`, {
      method: "DELETE",
    });
    fetchBooks();
  };

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="p-6">
      {/* 🔍 Search Bar */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Search Books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full max-w-md"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      {/* ➕ Add Book */}
      <div className="mb-6">
        <AddBook refreshBooks={fetchBooks} />
      </div>

      {/* 📚 Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition duration-300 h-full"
          >
            <figure className="px-4 pt-4">
              <img
                src={book.img}
                alt={book.title}
                className="rounded-xl h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title text-sm">{book.title}</h2>

              <div className="card-actions justify-between mt-4">
                <Link href={book.link} className="btn btn-primary btn-sm">
                  View
                </Link>

                <button
                  onClick={() => deleteBook(book.id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;