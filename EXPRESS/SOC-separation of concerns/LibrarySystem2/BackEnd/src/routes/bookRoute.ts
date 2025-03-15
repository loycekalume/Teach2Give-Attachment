import express from "express"
import { createBook, deleteBook, getBookById, getBook, updateBook ,patchBook} from "../controllers/bookController"

//instance of router 
const router = express.Router()

//create the routs
router.post("/", createBook)
router.get("/", getBook);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.patch("/:id", patchBook);

export default router