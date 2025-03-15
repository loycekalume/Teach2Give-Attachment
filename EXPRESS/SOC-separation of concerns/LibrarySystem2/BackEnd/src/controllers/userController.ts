import { Request, Response } from "express"
import pool from "../db/db.config"
import asyncHandler from "../middlewares/asyncHandler"





export const createUser = asyncHandler( async (req: Request, res: Response) => {
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

export const getUser = asyncHandler( async(req:Request, res:Response) => {
    try {
        const result = await pool.query("SELECT * FROM public.users ORDER BY user_id ASC ")
        res.status(200).json(result.rows)
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})


//Get single user

export const getUserById = asyncHandler( async(req:Request, res:Response) => {
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

export const updateUser = asyncHandler( async(req:Request, res:Response) => {
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


//patchUser
export const patchUser = asyncHandler( async(req:Request, res:Response) => {
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

export const deleteUser = asyncHandler(async(req:Request, res:Response) => {
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

