import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const token = localStorage.getItem("token");

  // Simulate fetching single book by ID
  useEffect(() => {

    if (!token) {
      navigate("/");
      return
    }
    
    bookDetailPage();
   
  }, []);

  const bookDetailPage = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/books/single/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
       setBook(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch book details");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Are you sure you want to delete this book?");
  if (!confirmDelete) return;

    try {
      const res = await axios.delete(`http://localhost:8000/api/books/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
       alert("Book deleted successfully!", res.data);
       navigate("/home")
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete book");
    }
  };

  if (!book) {
    return <p className="text-center text-gray-600 mt-10">Loading book details...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h2>
      <p className="text-lg text-gray-600 mb-4">by {book.author}</p>
      <p className="text-gray-700 leading-relaxed mb-6">{book.description}</p>

      <div className="flex justify-between">
        <Link
          to={`/edit/${book._id}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow transition"
        >
          Edit Book
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow transition"
        >
          Delete Book
        </button>
        <Link
          to="/home"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
