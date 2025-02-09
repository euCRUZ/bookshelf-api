import mongoose from "mongoose"

const authorSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      required: [true, "Author name is required"], // Custom Error Message from Mongoose
    },
    nationality: {
      type: String,
    },
  },
  { versionKey: false }
)

const author = mongoose.model("authors", authorSchema)

export { author, authorSchema }
