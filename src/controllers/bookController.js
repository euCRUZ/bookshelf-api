import NotFound from "../errors/notFound.js"
import { author } from "../models/Author.js"
import book from "../models/Book.js"

export default class BookController {
  // GET
  static async getBooks(req, res, next) {
    try {
      const booksList = await book.find({})
      res.status(200).json(booksList) // Complex Data, use JSON
    } catch (error) {
      next(error)
    }
  }

  // FILTER BY ID
  static async getBookByID(req, res, next) {
    try {
      const id = req.params.id
      const findedBook = await book.findById(id)

      if (findedBook !== null) {
        res.status(200).json(findedBook) // Complex Data, use JSON
      } else {
        next(new NotFound("Book not founded"))
      }
    } catch (error) {
      next(error)
    }
  }

  // POST
  static async registerBook(req, res, next) {
    const newBook = req.body

    try {
      const authorFinded = await author.findById(newBook.author)
      const completeBook = { ...newBook, author: { ...authorFinded._doc } }
      const createdBook = await book.create(completeBook)
      res.status(201).json({ message: "Book registered", Book: createdBook })
    } catch (error) {
      next(error)
    }
  }

  // PUT
  static async updateBook(req, res, next) {
    try {
      const id = req.params.id
      const bookResult = await book.findByIdAndUpdate(id, req.body)

      if (bookResult !== null) {
        res.status(200).json({ message: "Book updated!" }) // Complex Data, use JSON
      } else {
        next(new NotFound("Book not founded"))
      }
    } catch (error) {
      next(error)
    }
  }

  // DELETE
  static async deleteBook(req, res, next) {
    try {
      const id = req.params.id
      const bookResult = await book.findByIdAndDelete(id)

      if (bookResult !== null) {
        res.status(200).json({ message: "Book deleted!" }) // Complex Data, use JSON
      } else {
        next(new NotFound("Book not founded"))
      }
    } catch (error) {
      next(error)
    }
  }

  static async listBooksByPublisher(req, res, next) {
    const publisher = req.query.publisher

    try {
      const booksByPublisher = await book.find({ publisher: publisher })
      res.status(200).json(booksByPublisher)
    } catch (error) {
      next(error)
    }
  }
}
