"use client";
import { useState } from "react";

const AddBook = ({ onBookAdded }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newBookTitle, setNewBookTitle] = useState("");

  const handleSubmitNewBook = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: newBookTitle,
        link: "https://www.amazon.com/dp/B0979MGJ5J",
        img: "https://via.placeholder.com/600/92c952",
      }),
    });

    if (res.ok) {
      setNewBookTitle("");
      setModalOpen(false);
      onBookAdded(); // 🔥 refresh books
    }
  };

  return (
    <div>
      <button className="btn" onClick={() => setModalOpen(true)}>
        Add Book
      </button>

      <dialog className={`modal ${modalOpen ? "modal-open" : ""}`}>
        <form className="modal-box" onSubmit={handleSubmitNewBook}>
          
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <h3 className="font-bold text-lg">Add New Book</h3>

          <input
            value={newBookTitle}
            onChange={(e) => setNewBookTitle(e.target.value)}
            type="text"
            placeholder="Enter New Book Title"
            className="input input-bordered w-full mt-3"
            required
          />

          <button type="submit" className="btn btn-primary mt-4">
            Add Book
          </button>
        </form>
      </dialog>
    </div>
  );
};

export default AddBook;