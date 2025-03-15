import { Request, Response } from "express"
import pool from "../db/db.config"
import asyncHandler from "../middlewares/asyncHandler"




//creating borrowers

export const createBorrower = asyncHandler( async (req: Request, res: Response): Promise<void> => {
    try {
        const { user_id, book_id, librarian_id, return_date, status } = req.body;

        // Check if user exists and get their role_id
        const userCheck = await pool.query("SELECT role_id FROM users WHERE user_id = $1", [user_id]);

        if (userCheck.rows.length === 0) {
            res.status(400).json({ message: "User does not exist" });
            return;
        }

        // Ensure only users with role_id = 3 (borrowers) can borrow books
        const userRole = userCheck.rows[0].role_id;
        if (userRole !== 3) {
            res.status(403).json({ message: "Only users with role_id = 3 (borrowers) can borrow books" });
            return;
        }

        // Check if book exists
        const bookCheck = await pool.query("SELECT book_id FROM books WHERE book_id = $1", [book_id]);
        if (bookCheck.rows.length === 0) {
            res.status(400).json({ message: "Book does not exist" });
            return;
        }

        // Check if librarian exists
        const librarianCheck = await pool.query("SELECT role_id FROM users WHERE user_id = $1", [librarian_id]);
        if (librarianCheck.rows.length === 0 || librarianCheck.rows[0].role_id !== 2) {  // Assuming role_id = 2 for librarians
            res.status(400).json({ message: "Librarian does not exist or is not a valid librarian" });
            return;
        }

        // Insert into borrowers table
        const borrowResult = await pool.query(
            `INSERT INTO borrowers (user_id, book_id, librarian_id, return_date, status) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [user_id, book_id, librarian_id, return_date, status]
        );

        res.status(201).json({
            message: "Book borrowed successfully",
            borrower: borrowResult.rows[0]
        });

    } catch (error) {
        console.error("Error borrowing book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


//get all borrowers

export const getBorrower = asyncHandler( async(req:Request, res:Response) => {
    try {
        const result = await pool.query("SELECT * FROM public.borrowers ORDER BY borrower_id ASC ")
        res.status(200).json(result.rows)
    } catch (error) {
        console.error("Error creating borrower:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

//get a singleborrower

export const getBorrowerById = asyncHandler( async(req:Request, res:Response) => {
    try {
        const {id} =req.params
        const result = await pool.query("SELECT * FROM public.borrowers WHERE borrower_id = $1", [id])
        if (result.rows.length === 0) {
            res.status(400).json({ message: "Borrower not found" });
            return
       }
        res.status(200).json(result.rows[0]) 
    } catch (error) {
        console.error("Error creating borower:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

//update borrower
/*
app.put('/api/v1/borrowers/:id', async(req:Request, res:Response) => {
    try {
        const {id} =req.params
        const {user_id, book_id, librarian_id, return_date, status} = req.body

        const checkBorrower = await pool.query("SELECT * FROM public.borrowers WHERE borrower_id = $1", [id])
        if (checkBorrower.rows.length === 0) {
            res.status(400).json({ message: "Borrower not found" });
            return
       } 
        const result = await pool.query(
            "UPDATE borrowers SET user_id=$1, book_id=$2, librarian_id=$3,return_date=$4,status=$5,updated_at=NOW() WHERE borrower_id=$6 RETURNING *",
            [user_id, book_id, librarian_id, return_date, status, id]
        );
        res.json({ message: "Borrower updated", borrower: result.rows[0] });
    
    } catch (error) {
        console.error("Error creating borrower:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})*/