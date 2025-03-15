import express from "express"
import { createBorrower,  getBorrowerById, getBorrower } from "../controllers/borrowerController"

//instance of router 
const router = express.Router()

//create the routs
router.post("/", createBorrower)
router.get("/", getBorrower);
router.get("/:id", getBorrowerById);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);

export default router