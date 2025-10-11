// import {Book} from "../models/books.model.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";

// const addBook = async (req, res) => {
//     try {
//         const {title, author, description, year} = req.body;
//         let imageUrl = "";

//         const existingBook = await Book.findOne({title , user: req.user._id})

//         if (existingBook) {
//             return res.status(400).json({ message: "Book already exists" });
//         }


//         const imagePath = req.file?.path // multer upload file path
        

//         if (imagePath) {
//             const cloudinaryResult = await uploadOnCloudinary(imagePath);
//             image = cloudinaryResult.url
//         }

//         console.log("📤 Uploading file:", req.file?.path);
// const cloudinaryResult = await uploadOnCloudinary(req.file?.path);
// console.log("☁️ Cloudinary result:", cloudinaryResult);


//         const newBook = await Book.create({
//             title,
//             author,
//             description,
//             year,
//             image,
//             user: req.user._id
//         })

        
//         await newBook.save();
//         res.status(201).json(newBook);
        

//     } catch (error) {
//       res.status(500).json({ message: error.message });    
//     }
// }

// const getAllBook = async (req, res)=> {
//     try {
//         const books = await Book.find({ user: req.user._id});
//         res.status(200).json(books); 
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// const getUpdateBook = async (req, res)=> {
//     try {
//         const {id} = req.params;
//         const updateBook = await Book.findByIdAndUpdate({_id: id, user: req.user._id}, req.body, {new: true});
        
//         if (!updateBook) return res.status(400).json({ message: "Book not found" });
        
//         res.status(200).json(updateBook);

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }

// }


// const getdDeleteBook = async (req, res)=> {
//     try {
//         const {id} = req.params;
//         const deletebook = await Book.findOneAndDelete({_id: id, user: req.user._id});

//         if (!deletebook) return res.status(400).json({ message: "Book not found" });
        
//         res.status(200).json(deletebook);

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// const getSingleBook = async (req, res)=> {
//      try {
//         const {id} = req.params;
//         const singleBook = await Book.findOne({_id: id, user: req.user._id})

//         if (!singleBook) return res.status(400).json({ message: "Book not found" });
        
//         res.status(200).json(singleBook);
//      } catch (error) {
//         res.status(500).json({ message: error.message });
//      }
// }

// export {addBook, getAllBook, getUpdateBook, getdDeleteBook, getSingleBook};






















import {Book} from "../models/books.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addBook = async (req, res) => {
    try {
        const {title, author, description, year} = req.body;
        let imageUrl = "";

        const existingBook = await Book.findOne({title , user: req.user._id})
        if (existingBook) {
            return res.status(400).json({ message: "Book already exists" });
        }

        // Image upload logic - EK HI BAAR CALL KARO
        if (req.file?.path) {
            console.log("📤 Uploading file:", req.file.path);
            const cloudinaryResult = await uploadOnCloudinary(req.file.path);
            console.log("☁️ Cloudinary result:", cloudinaryResult);
            
            if (cloudinaryResult && cloudinaryResult.url) {
                imageUrl = cloudinaryResult.url;
            } else {
                return res.status(400).json({ message: "Image upload failed" });
            }
        } else {
            return res.status(400).json({ message: "Image file is required" });
        }

        const newBook = await Book.create({
            title,
            author,
            description,
            year,
            image: imageUrl, 
            user: req.user._id
        });

        await newBook.save()

        res.status(201).json({
            message: "Book successfully added!",
            book: newBook
        });

    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({ message: error.message });    
    }
}


const getAllBook = async (req, res)=> {
    try {
        const books = await Book.find({ user: req.user._id});
        res.status(200).json(books); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// const getUpdateBook = async (req, res)=> {
//     try {
//         const {id} = req.params;
//         const updateBook = await Book.findByIdAndUpdate({_id: id, user: req.user._id}, req.body, {new: true});
        
//         if (!updateBook) return res.status(400).json({ message: "Book not found" });
        
//         res.status(200).json(updateBook);

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

const getUpdateBook = async (req, res) => {
    try {
        const { id } = req.params;
        
        // console.log("🔄 Update request received:", {
        //     id: id,
        //     body: req.body,
        //     hasFile: !!req.file,
        //     filePath: req.file?.path
        // });

        // Create update object with text fields from req.body
        const updateData = {
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            year: req.body.year
        };

        // ✅ Handle image upload if new file provided
        if (req.file?.path) {
            console.log("📤 Uploading new image for update...");
            try {
                const cloudinaryResult = await uploadOnCloudinary(req.file.path);
                console.log("☁️ Cloudinary upload result:", cloudinaryResult);
                
                if (cloudinaryResult && cloudinaryResult.url) {
                    updateData.image = cloudinaryResult.url;
                    console.log("New image URL:", updateData.image);
                } else {
                    console.log("Cloudinary upload failed - no URL returned");
                    return res.status(400).json({ message: "Image upload failed" });
                }
            } catch (uploadError) {
                console.error("Image upload error:", uploadError);
                return res.status(400).json({ message: "Image upload failed: " + uploadError.message });
            }
        } else {
            console.log("No new image provided, keeping current image");
            // Image field update nahi karenge - current image rahegi
        }

        console.log("Final update data:", updateData);

        //  Update book in database
        const updateBook = await Book.findByIdAndUpdate(
            { _id: id, user: req.user._id }, 
            updateData, 
            { new: true }
        );
        
        if (!updateBook) {
            return res.status(400).json({ message: "Book not found" });
        }

        console.log("Book updated successfully:", updateBook.title);
        res.status(200).json(updateBook);

    } catch (error) {
        console.error("Update book error:", error);
        res.status(500).json({ message: error.message });
    }
}

const getdDeleteBook = async (req, res)=> {
    try {
        const {id} = req.params;
        const deletebook = await Book.findOneAndDelete({_id: id, user: req.user._id});

        if (!deletebook) return res.status(400).json({ message: "Book not found" });
        
        res.status(200).json(deletebook);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSingleBook = async (req, res)=> {
     try {
        const {id} = req.params;
        const singleBook = await Book.findOne({_id: id, user: req.user._id})

        if (!singleBook) return res.status(400).json({ message: "Book not found" });
        
        res.status(200).json(singleBook);
     } catch (error) {
        res.status(500).json({ message: error.message });
     }
}

export {addBook, getAllBook, getUpdateBook, getdDeleteBook, getSingleBook};




































































// import {Book} from "../models/books.model.js";

// const addBook = async (req, res) => {
//     try {
//         const {title, author, description, year} = req.body;

//         const newBook = await Book.create({
//             title,
//             author,
//             description,
//             year,
//             user: req.user._id
//         })

//         await newBook.save();
//         res.status(201).json(newBook);
    
//     } catch (error) {
//       res.status(500).json({ message: error.message });    
//     }
// }

// const getAllBook = async (req, res)=> {
//     try {
//         const books = await Book.find({ user: req.user._id});
//         res.status(200).json(books); 
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// const getUpdateBook = async (req, res)=> {
//     try {
//         const {id} = req.params;
//         const updateBook = await Book.findByIdAndUpdate({_id: id, user: req.user._id}, req.body, {new: true});
        
//         if (!updateBook) return res.status(400).json({ message: "Book not found" });
        
//         res.status(200).json(updateBook);

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }

// }


// const getdDeleteBook = async (req, res)=> {
//     try {
//         const {id} = req.params;
//         const deletebook = await Book.findOneAndDelete({_id: id, user: req.user._id});

//         if (!deletebook) return res.status(400).json({ message: "Book not found" });
        
//         res.status(200).json(deletebook);

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

// const getSingleBook = async (req, res)=> {
//      try {
//         const {id} = req.params;
//         const singleBook = await Book.findOne({_id: id, user: req.user._id})

//         if (!singleBook) return res.status(400).json({ message: "Book not found" });
        
//         res.status(200).json(singleBook);
//      } catch (error) {
//         res.status(500).json({ message: error.message });
//      }
// }

// export {addBook, getAllBook, getUpdateBook, getdDeleteBook, getSingleBook};
