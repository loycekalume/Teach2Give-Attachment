import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { readFileSync } from "fs";
import path from 'path'
import pool from "./db/db.config"

// Configure environment variables
dotenv.config();

const app = express();
const port = process.env.PORT ;

// Enable CORS for frontend access
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET",
    credentials: true
}));
app.use(express.json());




//create a book(post /api/v1/book)
//reading an external thing ike a file, a database, etc, cloud 
//these things need time to connect to them - so making the request Asynchronous will help with the logic
app.post('/api/v1/books', async (req: Request, res: Response) => {
    try {
        const { title, author, genre,year,pages,price,publisher,description,image } = req.body

        //check if title exists
        const titleCheck = await pool.query("SELECT id FROM books WHERE title = $1", [title])

        if (titleCheck.rows.length > 0) {
            res.status(400).json({
                message: "The Book already exists"
            })
            return
        }
        //insert the book 
        const bookResult = await pool.query(
            `INSERT INTO books (title, author, genre, year, pages, price, publisher, description, image)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         RETURNING *;`, [title, author, genre,year,pages,price,publisher,description,image]
        )
        res.status(201).json({
            message: "Book successfully created",
            book: bookResult.rows[0]
        })
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

//Get All books
app.get('/api/v1/books', async(req:Request, res:Response) => {
    try {
        const result = await pool.query("SELECT * FROM public.books ORDER BY id ASC ")
        res.status(200).json(result.rows)
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})


// //Get single book
app.get('/api/v1/books/:id', async(req:Request, res:Response) => {
    try {
        const {id} =req.params
        const result = await pool.query("SELECT * FROM public.books WHERE id = $1", [id])
        if (result.rows.length === 0) {
            res.status(400).json({ message: "Book not found" });
            return
       }
        res.status(200).json(result.rows[0]) 
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})


// //update book 
app.put('/api/v1/books/:id', async(req:Request, res:Response) => {
    try {
        const {id} =req.params
        const { title, author, genre,year,pages,price,publisher,description,image } = req.body

        const checkBook = await pool.query("SELECT * FROM public.books WHERE id = $1", [id])
        if (checkBook.rows.length === 0) {
            res.status(400).json({ message: "Book not found" });
            return
       } 
        const result = await pool.query(
            "UPDATE books SET title=$1, author=$2, genre=$3,year=$4,pages=$5,price=$6,publisher=$7,description=$8,image=$9 WHERE id=$10 RETURNING *",
            [title, author, genre,year,pages,price,publisher,description,image,  id]
        );
        res.json({ message: "Book updated", book: result.rows[0] });
    
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

// //delete user  
app.delete('/api/v1/books/:id', async(req:Request, res:Response) => {
    try {
        const {id} =req.params

        const checkBook = await pool.query("SELECT * FROM public.books WHERE id = $1", [id])
        if (checkBook.rows.length === 0) {
            res.status(400).json({ message: "Book not found" });
            return
       } 
        await pool.query("DELETE FROM public.books WHERE id = $1",[id]);
        res.json({ message: "Book deleted successful" });
    
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})



app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });