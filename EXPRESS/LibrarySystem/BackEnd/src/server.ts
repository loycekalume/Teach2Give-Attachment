import express, { Request, Response, NextFunction } from "express"
import dotenv from 'dotenv'
import { readFileSync } from "fs"
import path from 'path'
import cors from "cors"
import pool from "./db/db.config"

//1:configure the dotenv 
//top most level
dotenv.config()

//2:instance of express
//the second most top level
const app = express()

//3:load the variables
const port = process.env.PORT
const secret = process.env.SECRET



//4: enable middlewares 
//this will enable stringying to json
app.use(express.json())
//eneable CORS for all origins  
// app.use(cors())

//enable cors with optiosn (RECOMMENDED)
//To allow only http://localhost:5173:
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, PUT,DELETE",
    credentials: true //allows cookies and auth headers
}))


//midle wares
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))// for parsing application/x-www-form-urlencoded


//get the current  directory 
const _dirname = path.resolve()

//synchronously read the file
// const eventData = readFileSync(
//     path.join(_dirname, "src", "db", "eventsData.json"), "utf-8"
// )
//creating user_role
app.get('/api/v1/userRoles', async (req: Request, res: Response) => {
    try {
        const roles = await pool.query("SELECT * FROM user_roles");
        res.status(200).json({ roles: roles.rows });
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//create an user
// ✅ Correct Dynamic user creation endpoint:
app.post("/api/v1/users", async (req: Request, res: Response) => {
    try {
        const { name,email,password,role_id} = req.body;

        // First, dynamically verify the role exists:
        const userRoleCheck = await pool.query(
            "SELECT role_id FROM user_roles WHERE role_id = $1",
            [role_id]
        );

        if (userRoleCheck.rows.length === 0) {
             res.status(400).json({ message: "UserRole does not exist" });
             return
        }

        // Proceed to create event
        const userResult = await pool.query(
            `INSERT INTO users(name,email,password,role_id) 
             VALUES ($1, $2, $3, $4) RETURNING *`,
            [name,email,password,role_id]
        );

        res.status(201).json({
            message: "User created successfully",
            user: userResult.rows[0]
        });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});





//create a user (post /api/v1/users)
//reading an external thing ike a file, a database, etc, cloud 
//these things need time to connect to them - so making the request Asynchronous will help with the logic

//Get All users 
app.get('/api/v1/users', async(req:Request, res:Response) => {
    try {
        const result = await pool.query("SELECT * FROM public.users ORDER BY user_id ASC ")
        res.status(200).json(result.rows)
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})


//Get single user
app.get('/api/v1/users/:id', async(req:Request, res:Response) => {
    try {
        const {id} =req.params
        const result = await pool.query("SELECT * FROM public.users WHERE user_id = $1", [id])
        if (result.rows.length === 0) {
            res.status(400).json({ message: "User not found" });
            return
       }
        res.status(200).json(result.rows[0]) 
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})


//update user 
app.put('/api/v1/users/:id', async(req:Request, res:Response) => {
    try {
        const {id} =req.params
        const { name, email, password } = req.body

        const checkUser = await pool.query("SELECT * FROM public.users WHERE user_id = $1", [id])
        if (checkUser.rows.length === 0) {
            res.status(400).json({ message: "User not found" });
            return
       } 
        const result = await pool.query(
            "UPDATE users SET name=$1, email=$2, password=$3, updated_at=NOW() WHERE user_id=$4 RETURNING *",
            [name, email, password, id]
        );
        res.json({ message: "User updated", user: result.rows[0] });
    
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

//delete user  
app.delete('/api/v1/users/:id', async(req:Request, res:Response) => {
    try {
        const {id} =req.params

        const checkUser = await pool.query("SELECT * FROM public.users WHERE user_id = $1", [id])
        if (checkUser.rows.length === 0) {
            res.status(400).json({ message: "User not found" });
            return
       } 
        await pool.query("DELETE FROM public.users WHERE user_id = $1",[id]);
        res.json({ message: "User deleted successful" });
    
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})



//create a book
// ✅ Correct Dynamic book creation endpoint:
app.post("/api/v1/books", async (req: Request, res: Response) => {
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

app.get('/api/v1/books', async(req:Request, res:Response) => {
    try {
        const result = await pool.query("SELECT * FROM public.books ORDER BY book_id ASC ")
        res.status(200).json(result.rows)
    } catch (error) {
        console.error("Error creating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

app.get('/api/v1/books/:id', async(req:Request, res:Response) => {
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

app.put('/api/v1/books/:id', async(req:Request, res:Response) => {
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

app.delete('/api/v1/books/:id', async(req:Request, res:Response) => {
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



//creating borrowers
app.post("/api/v1/borrowers", async (req: Request, res: Response): Promise<void> => {
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
app.get('/api/v1/borrowers', async(req:Request, res:Response) => {
    try {
        const result = await pool.query("SELECT * FROM public.borrowers ORDER BY borrower_id ASC ")
        res.status(200).json(result.rows)
    } catch (error) {
        console.error("Error creating borrower:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

//get a singleUser
app.get('/api/v1/borrowers/:id', async(req:Request, res:Response) => {
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
// create server 
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})



