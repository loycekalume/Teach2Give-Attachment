import { Request, Response } from "express"
import pool from "../db/db.config"
import asyncHandler from "../middlewares/asyncHandler"









//creating user_role

export const getUserRole = asyncHandler( async (req: Request, res: Response) => {
    try {
        const roles = await pool.query("SELECT * FROM user_roles");
        res.status(200).json({ roles: roles.rows });
    } catch (error) {
        console.error("Error fetching roles:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});