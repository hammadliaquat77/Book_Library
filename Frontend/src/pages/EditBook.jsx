import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditBook () {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    description: "",
    // image: "",
  });


  useEffect(() => {
    
    if (!token) {
      navigate("/");
      return
    }

    fetchBookDetail();

  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchBookDetail = async ()=> {
    try {
      const res = await axios.get(`http://localhost:8000/api/books/single/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
       setFormData({
        title: res.data.title || "",
        author: res.data.author || "",
        year: res.data.year || "",
        description: res.data.description || "",
        // image: res.data.image || "",
       })
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch book details");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
     const res = await axios.put(`http://localhost:8000/api/books/update/${id}`, formData, {
       headers: { Authorization: `Bearer ${token}` }
     })
      
    alert("Book updated successfully!", res.data);
    navigate("/home");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Edit Book
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Year</label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* <div>
          <label className="block text-gray-700 mb-1 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div> */}

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Update Book
        </button>
      </form>
    </div>
  );
}
