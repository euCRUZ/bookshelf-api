import mongoose from "mongoose"
import { authorSchema } from "./Author.js"
import e from "express"

const bookSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    title: {
      type: String,
      required: [true, "Book title is required"],
    },
    publisher: {
      type: String,
      enum: {
        values: ["Penguin", "Pearson"],
        message: "Publisher must be either Penguin or Pearson",
      },
    },
    price: {
      type: Number,
    },
    pages: {
      type: Number,
      min: [10, "Book must have at least 10 pages"],
      max: 5000,
    },
    author: authorSchema,
  },
  { versionKey: false }
)

const book = mongoose.model("books", bookSchema)

export default book
