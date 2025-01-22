import express from "express"
import BookController from "../controllers/bookController.js"

const routes = express.Router()

routes.get("/books", BookController.getBooks)
routes.get("/books/search", BookController.listBooksByFilter) // Most complex route in the top
routes.get("/books/:id", BookController.getBookByID)
routes.post("/books", BookController.registerBook)
routes.put("/books/:id", BookController.updateBook)
routes.delete("/books/:id", BookController.deleteBook)

export default routes
