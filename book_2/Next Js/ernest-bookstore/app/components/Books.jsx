"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LoadingPage from "../loading";
import AddBook from "./AddBook";

async function getBooks() {
  const res = await fetch("http://localhost:3000/api/books");
  return res.json();
}

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBooks().then((books) => {
      setBooks(books);
      setLoading(false);
    });
  }, []);

  const fetchBooksAgain = async () => {
    const books = await getBooks();
    setBooks(books);
  };

  if (loading) return <LoadingPage />;

  return (
    <div>
      <AddBook onBookAdded={fetchBooksAgain} />

      {books.map((book) => (
        <div key={book.id}>
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img src={book.img} width="200" height="150" />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{book.id}</h2>
              <p>{book.title}</p>

              <div className="card-actions justify-end">
                <Link href={book.link} className="btn btn-primary">
                  See in Amazon
                </Link>

                <button className="btn btn-error">Delete</button>
              </div>
            </div>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Books;