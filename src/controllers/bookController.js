import { author } from "../models/Author.js"
import book from "../models/Book.js"

export default class BookController {
  // GET
  static async getBooks(req, res) {
    try {
      const booksList = await book.find({})
      res.status(200).json(booksList) // Complex Data, use JSON
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error getting books", error: error.message })
    }
  }

  // FILTER BY ID
  static async getBookByID(req, res) {
    try {
      const id = req.params.id
      const findedBook = await book.findById(id)
      res.status(200).json(findedBook) // Complex Data, use JSON
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error getting the book", error: error.message })
    }
  }

  // POST
  static async registerBook(req, res) {
    const newBook = req.body

    try {
      const authorFinded = await author.findById(newBook.author)
      const completeBook = { ...newBook, author: { ...authorFinded._doc } }
      const createdBook = await book.create(completeBook)
      res.status(201).json({ message: "Book registered", Book: createdBook })
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error registering book", error: error.message })
    }
  }

  // PUT
  static async updateBook(req, res) {
    try {
      const id = req.params.id
      await book.findByIdAndUpdate(id, req.body)
      res.status(200).json({ message: "Book updated!" }) // Complex Data, use JSON
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error in the update", error: error.message })
    }
  }

  // DELETE
  static async deleteBook(req, res) {
    try {
      const id = req.params.id
      await book.findByIdAndDelete(id)
      res.status(200).json({ message: "Book deleted!" }) // Complex Data, use JSON
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting book", error: error.message })
    }
  }

  static async listBooksByPublisher(req, res) {
    const publisher = req.query.publisher

    try {
      const booksByPublisher = await book.find({ publisher: publisher })
      res.status(200).json(booksByPublisher)
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error getting books", error: error.message })
    }
  }
}
