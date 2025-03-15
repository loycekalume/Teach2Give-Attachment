import { Request, Response } from "express"
import pool from "../db/db.config"
import asyncHandler from "../middlewares/asyncHandler"




//create a book
// ✅ Correct Dynamic book creation endpoint:
export const createBook = asyncHandler(  async (req: Request, res: Response) => {
    try {
        const { title, author, genre, year, pages, price, publisher, description, image_url, created_by } = req.body;

        // Verify the admin user exists and fetch their role
        const adminCheck = await pool.query(
            "SELECT user_id, role_id FROM users WHERE user_id = $1",
            [created_by]
        );

        if (adminCheck.rows.length === 0) {
            res.status(400).json({ message: "Admin user does not exist" });
            return;
        }

        //  Check if the user is an admin (assuming role_id = 1 is for admins)
        const userRole = adminCheck.rows[0].role_id;
        if (userRole !== 1) {
            res.status(403).json({ message: "Access denied. Only admins can add books." });
            return;
        }

        //  Proceed to create book
        const bookResult = await pool.query(
            `INSERT INTO books(title, author, genre, year, pages, price, publisher, description, image_url, created_by) 
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
            [title, author, genre, year, pages, price, publisher, description, image_url, created_by]
        );

        res.status(201).json({
            message: "Book created successfully",
            book: bookResult.rows[0],
        });

    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export const getBook = asyncHandler(  async(req:Request, res:Response) => {
    try {
        const result = await pool.query("SELECT * FROM public.books ORDER BY book_id ASC ")
        res.status(200).json(result.rows)
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

export const getBookById = asyncHandler(  async(req:Request, res:Response) => {
    try {
        const {id} =req.params
        const result = await pool.query("SELECT * FROM public.books WHERE book_id = $1", [id])
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

export const updateBook = asyncHandler(  async(req:Request, res:Response) => {
    try {
        const {id} =req.params
        const {title, author, genre,year,pages,price,publisher,description,image_url,created_by } = req.body

        const checkBook = await pool.query("SELECT * FROM public.books WHERE book_id = $1", [id])
        if (checkBook.rows.length === 0) {
            res.status(400).json({ message: "Book not found" });
            return
       } 
        const result = await pool.query(
            "UPDATE books SET title=$1, author=$2, genre=$3,year=$4,pages=$5,price=$6,publisher=$7,description=$8,image_url=$9,created_by=$10,updated_at=NOW() WHERE book_id=$11 RETURNING *",
            [title, author, genre,year,pages,price,publisher,description,image_url,created_by, id]
        );
        res.json({ message: "Book updated", book: result.rows[0] });
    
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

 export const deleteBook = asyncHandler(async(req:Request, res:Response) => {
    try {
        const {id} =req.params

        const checkUser = await pool.query("SELECT * FROM public.books WHERE book_id = $1", [id])
        if (checkUser.rows.length === 0) {
            res.status(400).json({ message: "Book not found" });
            return
       } 
        await pool.query("DELETE FROM public.books WHERE book_id = $1",[id]);
        res.json({ message: "Book deleted successful" });
    
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})


export const patchBook = asyncHandler(  async(req:Request, res:Response) => {
    try {
        const {id} =req.params
        const {title, author, genre,year,pages,price,publisher,description,image_url,created_by } = req.body

        const checkBook = await pool.query("SELECT * FROM public.books WHERE book_id = $1", [id])
        if (checkBook.rows.length === 0) {
            res.status(400).json({ message: "Book not found" });
            return
       } 
        const result = await pool.query(
            "UPDATE books SET title=$1, author=$2, genre=$3,year=$4,pages=$5,price=$6,publisher=$7,description=$8,image_url=$9,created_by=$10,updated_at=NOW() WHERE book_id=$11 RETURNING *",
            [title, author, genre,year,pages,price,publisher,description,image_url,created_by, id]
        );
        res.json({ message: "Book updated", book: result.rows[0] });
    
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})
