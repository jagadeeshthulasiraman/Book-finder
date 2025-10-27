import React from "react";
import { useState } from "react";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchBooks = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://openlibrary.org/search.json?title=${query}`);
      const data = await res.json();
      if (data.docs.length === 0) {
        setError("No books found. Try a different title.");
      } else {
        setBooks(data.docs.slice(0, 12));
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">📚 Book Finder</h1>
      <div className="flex gap-2 w-full max-w-md mb-6">
        <input
          type="text"
          placeholder="Search for a book..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-2 border rounded-lg focus:outline-none"
        />
        <button
          onClick={fetchBooks}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {books.map((book) => (
          <div
            key={book.key}
            className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            {book.cover_i ? (
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                alt={book.title}
                className="w-full h-56 object-cover rounded-md mb-3"
              />
            ) : (
              <div className="w-full h-56 bg-gray-300 flex items-center justify-center text-gray-500 rounded-md mb-3">
                No Image
              </div>
            )}
            <h2 className="font-semibold text-lg">{book.title}</h2>
            <p className="text-gray-600 text-sm">
              {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
            </p>
            <p className="text-gray-500 text-sm">
              {book.first_publish_year ? `📅 ${book.first_publish_year}` : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
