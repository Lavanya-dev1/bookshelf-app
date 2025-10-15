import { useEffect, useState } from "react";
import axios from "axios";
function BookDetail({ id }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`https://openlibrary.org/works/${id}.json`);
        setBook(res.data);
      } catch (err) {
        setError("Error fetching book details.");
      }
      setLoading(false);
    };
    fetchBook();
  }, [id]);
  if (loading) return <p style={{ textAlign: "center" }}>Loading book details...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>{error}</p>;
  if (!book) return <p style={{ textAlign: "center" }}>No details available.</p>;
  return (
    <div className="book-detail">
      <img
        src={
          book.covers
            ? `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`
            : "https://via.placeholder.com/300x400"
        }
        alt={book.title}
      />
      <h2>{book.title}</h2>
      {book.authors && (
        <p style={{ fontStyle: "italic", color: "#555" }}>
          {book.authors.map((author) => author.name || author.author?.key).join(", ")}
        </p>
      )}
      <p>
        {book.description
          ? typeof book.description === "string"
            ? book.description
            : book.description.value
          : "No description available."}
      </p>
      <a href={`https://openlibrary.org/works/${id}`} target="_blank" rel="noopener noreferrer">
        View on OpenLibrary
      </a>
    </div>
  );
}
export default BookDetail;
