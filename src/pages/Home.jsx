import { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [featured, setFeatured] = useState([]);
 useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(`https://openlibrary.org/search.json?q=React`);
        setFeatured(res.data.docs.slice(0, 8)); 
      } catch (err) {
        console.error("Error fetching featured books:", err);
      }
    };
    fetchFeatured();
  }, []);
    const handleSearch = async (query) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`https://openlibrary.org/search.json?q=${query}`);
      if (res.data.docs.length === 0) setError("No books found for this search.");
      setBooks(res.data.docs);
    } catch (err) {
      setError("Error fetching books. Please try again.");
    }
    setLoading(false);
  };
return (
    <div className="home-container">
      <SearchBar onSearch={handleSearch} />
      {books.length > 0 && (
        <div className="book-grid">
          {books.map((book) => (
            <BookCard key={book.key} book={book} />
          ))}
        </div>
      )}
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
      {books.length === 0 && !loading && (
        <>
          <div style={{ textAlign: "center", marginTop: "30px", color: "#555" }}>
            <h2>Welcome to Bookshelf App 📚</h2>
            <p>Search for your favorite books or explore topics like "Python", "Stories", "React", and more!</p>
          </div>
 <h3 style={{ marginLeft: "20px", color: "#2d3a8c" }}>Featured Books</h3>
          <div className="book-grid">
            {featured.map((book) => (
              <BookCard key={book.key} book={book} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
export default Home;
