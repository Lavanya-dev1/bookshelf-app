import { useParams, useNavigate } from "react-router-dom";
import BookDetail from "../components/BookDetail";
function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
 return (
    <div className="book-detail-page" style={{ padding: "20px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          padding: "10px 16px",
          borderRadius: "8px",
          border: "none",
          background: "#4e6ef2",
          color: "white",
          fontWeight: "500",
          cursor: "pointer",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          transition: "0.3s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#2d3a8c")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#4e6ef2")}
      >
        ⬅ Back
      </button>
<BookDetail id={id} />
    </div>
  );
}
export default BookDetailPage;
