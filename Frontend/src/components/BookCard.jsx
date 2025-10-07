import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

export default function BookCard({ book , handleDelete  }) {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {

    if (!token) {
      navigate("/");
      return
    }


  }, [])
  

  // const handleDelete = async () => {
  //   const confirmDelete = confirm("Are you sure you want to delete this book?");
  //   if (!confirmDelete) return;

  //   try {
  //     const res = await axios.delete(`http://localhost:8000/api/books/delete/${book._id}`, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     })
  //     alert("Book deleted successfully!", res.data);
  //     navigate("/home")
  //   } catch (error) {
  //     alert(error.response?.data?.message || "Failed to delete book");
  //   }
  // };


  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* <img */}
      {/* src={book.image} */}
      {/* alt={book.title} */}
      {/* className="h-48 w-full object-cover" */}
      {/* /> */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
        <p className="text-sm text-gray-500 mb-2">by {book.author}</p>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {book.description}
        </p>

        <div className="flex justify-between">
          <Link
            to={`/detail/${book._id}`}
            className="text-blue-600 hover:underline"
          >
            View
          </Link>
          <Link
            to={`/edit/${book._id}`}
            className="text-yellow-500 hover:underline"
          >
            Edit
          </Link>
          <button onClick={()=> handleDelete(book._id)} className="text-red-500 hover:underline">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
