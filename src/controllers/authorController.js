import { author } from "../models/Author.js"

export default class AuthorController {
  // GET
  static async getAuthors(req, res) {
    try {
      const authorList = await author.find({})
      res.status(200).json(authorList) // Complex Data, use JSON
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error getting author", error: error.message })
    }
  }

  // FILTER
  static async getAuthorByID(req, res) {
    try {
      const id = req.params.id
      const findedAuthor = await author.findById(id)
      res.status(200).json(findedAuthor) // Complex Data, use JSON
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error getting the author", error: error.message })
    }
  }

  // POST
  static async registerAuthor(req, res) {
    try {
      const newAuthor = await author.create(req.body)
      res.status(201).json({ message: "Author registered", author: newAuthor })
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error registering author", error: error.message })
    }
  }

  // PUT
  static async updateAuthor(req, res) {
    try {
      const id = req.params.id
      await author.findByIdAndUpdate(id, req.body)
      res.status(200).json({ message: "Author updated!" }) // Complex Data, use JSON
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error in the update", error: error.message })
    }
  }

  // DELETE
  static async deleteAuthor(req, res) {
    try {
      const id = req.params.id
      await author.findByIdAndDelete(id)
      res.status(200).json({ message: "Author deleted!" }) // Complex Data, use JSON
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting author", error: error.message })
    }
  }
}
