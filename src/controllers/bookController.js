import NotFound from "../errors/notFound.js"
import { author } from "../models/index.js"
import { book } from "../models/index.js"

export default class BookController {
  // GET
  static async getBooks(req, res, next) {
    try {
      let { limit = 5, page = 1 } = req.query



      const booksList = await book
        .find({})
        .skip((page - 1) * limit)
        .limit(Number(limit))

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

  static async listBooksByFilter(req, res, next) {
    try {
      const { title, publisher, auhtorName } = req.query

      const search = {}

      if (publisher) {
        search.publisher = { $regex: publisher, $options: "i" }
      }
      if (title) {
        search.title = { $regex: title, $options: "i" }
      }
      if (auhtorName) {
        const author = await author.findOne({ name: auhtorName })
        const authorID = author._id

        search.author = authorID
      }

      const booksByFilter = await book.find(search)
      res.status(200).json(booksByFilter)
    } catch (error) {
      next(error)
    }
  }
}
