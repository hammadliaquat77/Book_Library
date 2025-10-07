import {Book} from "../models/books.model.js";

const addBook = async (req, res) => {
    try {
        const {title, author, description, year} = req.body;

        const newBook = await Book.create({
            title,
            author,
            description,
            year,
            user: req.user._id
        })

        await newBook.save();
        res.status(201).json(newBook);
    
    } catch (error) {
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

const getUpdateBook = async (req, res)=> {
    try {
        const {id} = req.params;
        const updateBook = await Book.findByIdAndUpdate({_id: id, user: req.user._id}, req.body, {new: true});
        
        if (!updateBook) return res.status(400).json({ message: "Book not found" });
        
        res.status(200).json(updateBook);

    } catch (error) {
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
