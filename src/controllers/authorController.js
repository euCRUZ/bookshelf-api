import { author } from "../models/Author.js"

export default class AuthorController {
  
  // GET
  static async getAuthors(req, res, next) {
    try {
      const authorList = await author.find({})
      res.status(200).json(authorList) // Complex Data, use JSON
    } catch (error) {
      next(error)
    }
  }

  // FILTER
  static async getAuthorByID(req, res, next) {
    try {
      const id = req.params.id
      const findedAuthor = await author.findById(id)

      if (findedAuthor !== null) {
        res.status(200).json(findedAuthor) // Complex Data, use JSON
      } else {
        res.status(400).json({ message: "Author not founded" }) // Complex Data,
      }
    } catch (error) {
      next(error)
    }
  }

  // POST
  static async registerAuthor(req, res, next) {
    try {
      const newAuthor = await author.create(req.body)
      res.status(201).json({ message: "Author registered", author: newAuthor })
    } catch (error) {
      next(error)
    }
  }

  // PUT
  static async updateAuthor(req, res, next) {
    try {
      const id = req.params.id
      await author.findByIdAndUpdate(id, req.body)
      res.status(200).json({ message: "Author updated!" }) // Complex Data, use JSON
    } catch (error) {
      next(error)
    }
  }

  // DELETE
  static async deleteAuthor(req, res, next) {
    try {
      const id = req.params.id
      await author.findByIdAndDelete(id)
      res.status(200).json({ message: "Author deleted!" }) // Complex Data, use JSON
    } catch (error) {
      next(error)
    }
  }
}
