// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// export default function EditBook () {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const { id } = useParams();

//   const [formData, setFormData] = useState({
//     title: "",  
//     author: "",
//     year: "",
//     description: "",
//     // image: "",
//   });

//   const [imageFile, setImageFile] = useState(null);


//   useEffect(() => {
    
//     if (!token) {
//       navigate("/");
//       return
//     }

//     fetchBookDetail();

//   }, []);

//   const handleFileChange = (e) => {
//     setImageFile(e.target.files[0]);
//   }  

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };



//   const fetchBookDetail = async ()=> {
//     try {
//       const res = await axios.get(`http://localhost:8000/api/books/single/${id}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       })
//        setFormData({
//         title: res.data.title || "",
//         author: res.data.author || "",
//         year: res.data.year || "",
//         description: res.data.description || "",
//         // image: res.data.image || "",
//        })
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to fetch book details");
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

// try {
//       if (!imageFile) {
//         alert("Please select an image file");
//         return;
//       }
  
//       const submitData = new FormData();
//       submitData.append("title", formData.title);
//       submitData.append("author", formData.author);
//       submitData.append("year", formData.year);
//       submitData.append("description", formData.description);
//       submitData.append("image", imageFile);
  
//        const res = await axios.put(`http://localhost:8000/api/books/update/${id}`, formData, {
//          headers: { Authorization: `Bearer ${token}`,
//          "Content-Type": "multipart/form-data"}
//        })
        
//       alert("Book updated successfully!", res.data);
//       navigate("/home");
// } catch (error) {
//   console.error("Error updating book:", error);
//   alert("Failed to update book. Please try again.");
// }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
//       <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//         Edit Book
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-gray-700 mb-1 font-medium">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
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
//             rows="4"
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-gray-700 mb-1 font-medium">Image URL</label>
//           <input
//             type="file"
//             name="image"
//             value={formData.image}
//             accept="image/*"
//             onChange={handleFileChange}
//             required
//             className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
//         >
//           Update Book
//         </button>
//       </form>
//     </div>
//   );
// }










import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function EditBook() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    year: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [currentImage, setCurrentImage] = useState(""); // ✅ Current image URL

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchBookDetail();
  }, [token, id, navigate]);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchBookDetail = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/books/single/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFormData({
        title: res.data.title || "",
        author: res.data.author || "",
        year: res.data.year || "",
        description: res.data.description || "",
      });
      setCurrentImage(res.data.image || ""); // ✅ Store current image
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch book details");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Create FormData for update
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("author", formData.author);
      submitData.append("year", formData.year);
      submitData.append("description", formData.description);
      
      // ✅ Append image only if new file is selected
      if (imageFile) {
        submitData.append("image", imageFile);
      }

      // ✅ Send FormData, NOT formData
      const res = await axios.put(`http://localhost:8000/api/books/update/${id}`, submitData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Book updated successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error updating book:", error);
      alert(error.response?.data?.message || "Failed to update book. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Edit Book
      </h2>
      
      {/* ✅ Show current image */}
      {currentImage && (
        <div className="mb-4">
          <label className="block text-gray-700 mb-2 font-medium">Current Image</label>
          <img 
            src={currentImage} 
            alt="Current book cover" 
            className="w-32 h-32 object-cover rounded-lg border"
          />
        </div>
      )}

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
            type="number"
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

        <div>
          <label className="block text-gray-700 mb-1 font-medium">
            Update Image (Optional)
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {imageFile && (
            <p className="text-green-600 text-sm mt-1">
              ✅ New image selected: {imageFile.name}
            </p>
          )}
          <p className="text-gray-500 text-sm mt-1">
            Leave empty to keep current image
          </p>
        </div>

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