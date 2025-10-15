import { useNavigate } from "react-router-dom";
function BookCard({ book }) {
  const navigate = useNavigate();
  const handleView = () => {
    navigate(`/book/${book.key.replace("/works/", "")}`);
  };
  return (
    <div className="book-card">
      <img
        src={
          book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "https://via.placeholder.com/150"
        }
        alt={book.title}
      />
      <h3>{book.title}</h3>
      <p>{book.author_name ? book.author_name.join(", ") : "Unknown Author"}</p>
      
      <button onClick={handleView}>View Details</button>
    </div>
  );
}
export default BookCard;
