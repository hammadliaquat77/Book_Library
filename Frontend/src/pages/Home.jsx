import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import axios from "axios";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Simulate API fetch (replace later with real backend call)
  useEffect(() => {
    
    if (!token) {
       navigate("/");
       return
    }
    console.log("token", token);
    
     fetchBooks();
  }, [refresh]);

  const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/books/", {
          headers: {Authorization: `Bearer ${token}`}
        });
        setBooks(res.data);
        console.log("res.data", res.data);
        
      } catch (error) {
        alert(error.response?.data?.message || "Failed to fetch books");
      }
   };


     const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`http://localhost:8000/api/books/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert("Book deleted successfully!", res.data);
          setRefresh(!refresh);


    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete book");
    }
  };


   
    

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Books</h1>
        <Link
          to="/addbook"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          + Add Book
        </Link>
      </div>

      {books.length === 0 ? (
        <p className="text-gray-600 text-center">No books available yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} handleDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
