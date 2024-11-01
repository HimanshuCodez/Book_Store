import express from 'express';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken'
import Book from '../models/book.model.js';
import authenticateToken from './userAuth.routes.js';
 const router = express.Router();

router.post("/add-book", authenticateToken,async(req,res)=>{
    try {
        //to check user is admin or not
        const {id} = req.headers;
        const user = await User.findById(id);
        if(user.role !== "admin"){
            return res.status(403).json({ message: "You are not an admin" });
        }
        //book
        const { url,title, author, price,description,language } = req.body;
        const newBook = new Book({
            url: url,
            title: title,
            author: author,
            price: price,
            description: description,
            language: language
           
        });
        await newBook.save();
        res.status(200).json({ message: "Book added successfully" });
    } catch (error) {
        console.log("err addBook", error);
        res.status(500).json(error)
    }
})
router.put("/update-book", authenticateToken,async(req,res)=>{
    try {
        //to check user is admin or not
        const {bookid} = req.headers;
        
        // if(user.role !== "admin"){
        //     return res.status(403).json({ message: "You are not an admin" });
        // }
        //book
        const { url,title, author, price,description,language } = req.body;
        await Book.findByIdAndUpdate(bookid,{
            url: url,
            title: title,
            author: author,
            price: price,
            description: description,
            language: language
           
        });
        
         return res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        console.log("err addBook", error);
        return res.status(500).json(error)
    }
})


export default router;