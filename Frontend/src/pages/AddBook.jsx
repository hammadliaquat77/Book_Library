// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export default function AddBook() {
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//      if (!token) {
//        navigate("/");
//        return
//      }
//   }, [])
  

//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     year: "",
//     description: "",
//     image: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//      try {
//         const res = await axios.post("http://localhost:8000/api/books/add", formData , {
//           headers: { Authorization: `Bearer ${token}` }
//         })
//          alert("Book added successfully!");
//           navigate("/home")
//      } catch (error) {
//         alert(error.response?.data?.message || "Failed to add book");
//      }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//         Add New Book
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700 mb-1 font-medium">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="Enter book title"
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-1 font-medium">Author</label>
//           <input
//             type="text"
//             name="author"
//             value={formData.author}
//             onChange={handleChange}
//             placeholder="Enter author name"
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-1 font-medium">Year</label>
//           <input
//             type="text"
//             name="year"
//             value={formData.year}
//             onChange={handleChange}
//             placeholder="Enter author name"
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-1 font-medium">Description</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Write a short description"
//             rows="4"
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-1 font-medium">Image</label>
//           <input
//             type="file"
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
//         >
//           Add Book
//         </button>
//       </form>
//     </div>
//   );
// }














import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AddBook() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    description: "",
  });
  
  const [imageFile, setImageFile] = useState(null); 

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ✅ Check if image is selected
    if (!imageFile) {
      alert("Please select an image file");
      return;
    }

    try {
      // ✅ Create FormData for file upload
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("author", formData.author);
      submitData.append("year", formData.year);
      submitData.append("description", formData.description);
      submitData.append("image", imageFile); // ✅ Append file

      const res = await axios.post("http://localhost:8000/api/books/add", submitData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data" // ✅ Important for files
        }
      });
      
      alert("Book added successfully!");
      navigate("/home");
      
    } catch (error) {
      console.error("Error adding book:", error);
      alert(error.response?.data?.message || "Failed to add book");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add New Book
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
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
            placeholder="Enter author name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Enter publication year"
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
            placeholder="Write a short description"
            rows="4"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1 font-medium">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange} 
            accept="image/*" 
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          {imageFile && (
            <p className="text-green-600 text-sm mt-1">
              ✅ Selected: {imageFile.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}