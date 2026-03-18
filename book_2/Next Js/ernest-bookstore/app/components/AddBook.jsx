"use client";
import { useState } from "react";

const AddBook = ({ refreshBooks }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookLink, setNewBookLink] = useState("");
  const [newBookImg, setNewBookImg] = useState("");

  const handleSubmitNewBook = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/books`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: newBookTitle,
        link: newBookLink,
        img: newBookImg,
      }),
    });

    if (res.ok) {
      setNewBookTitle("");
      setNewBookLink("");
      setNewBookImg("");
      setModalOpen(false);
      refreshBooks(); // ✅ refresh list
    }
  };

  return (
    <div>
      <button className="btn" onClick={() => setModalOpen(true)}>
        Add New Book
      </button>

      <dialog
        className={`modal ${modalOpen ? "modal-open" : ""}`}
      >
        <form
          className="modal-box"
          onSubmit={handleSubmitNewBook}
        >
          <button
            type="button"
            onClick={() => setModalOpen(false)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <h3 className="font-bold text-lg">Add Book</h3>

          {/* Title */}
          <input
            type="text"
            value={newBookTitle}
            onChange={(e) => setNewBookTitle(e.target.value)}
            placeholder="Enter book title..."
            className="input input-bordered w-full mt-2"
            required
          />

          {/* Link */}
          <input
            type="text"
            value={newBookLink}
            onChange={(e) => setNewBookLink(e.target.value)}
            placeholder="Enter book link..."
            className="input input-bordered w-full mt-2"
            required
          />

          {/* Image */}
          <input
            type="text"
            value={newBookImg}
            onChange={(e) => setNewBookImg(e.target.value)}
            placeholder="Enter image URL..."
            className="input input-bordered w-full mt-2"
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