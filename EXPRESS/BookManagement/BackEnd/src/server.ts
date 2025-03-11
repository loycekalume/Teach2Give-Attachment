import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { readFileSync } from "fs";
import path from 'path'
import pool from "./db/db.config"

// Configure environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for frontend access
app.use(cors({
    origin: "http://localhost:5175",
    methods: "GET",
    credentials: true
}));
app.use(express.json());
const _dirname = path.resolve()
interface Book{
id: number;
title: string;
author: string;
genre: string;
year: number;
pages: number;
price: number;
publisher: string;
description:string;
image: string,
}

const booksData = readFileSync(
    path.join(_dirname, "src", "db", "db.json"), "utf-8"
)
const books:Book[] = JSON.parse(booksData)

// Insert books into PostgreSQL
const insertBooks = async () => {
    try {
        for (const book of books) {
            await pool.query(
                `INSERT INTO books (title, author, genre, year, pages, price, publisher, description, image)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
               `,  // Prevent duplicate books
                [book.title, book.author, book.genre, book.year, book.pages, book.price, book.publisher, book.description, book.image]
            );
        }
        console.log(" Books inserted into PostgreSQL");
    } catch (error) {
        console.error("Error inserting books:", error);
    }
};

// Call insert function
insertBooks();

// // Sample Books Data
// const books = [
//     { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", year: 1937, pages: 310, publisher: "Allen & Unwin", description: "A fantasy novel.", price: 25, image: "hobbit.jpg" },
//     { id: 2, title: "1984", author: "George Orwell", genre: "Dystopian", year: 1949, pages: 328, publisher: "Secker & Warburg", description: "A dystopian social science fiction novel.", price: 20, image: "1984.jpg" },
//     { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", year: 1925, pages: 180, publisher: "Charles Scribner's Sons", description: "A novel about the American dream.", price: 15, image: "gatsby.jpg" }
// ];

// API route to get books with filtering
app.get("/api/booksFilters", (req: Request, res: Response) => {
    try {
        const { genre } = req.query;
        let filteredBooks = [...books];

        if (genre && genre !== "all") {
            filteredBooks = books.filter(book => book.genre.toLowerCase() === (genre as string).toLowerCase());
        }

        res.json(filteredBooks);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
});


app.get('/api/booksData', (req, res) => {
    res.send(booksData)
})
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });