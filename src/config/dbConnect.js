import { config } from "dotenv"
import mongoose from "mongoose"

config()

export default async function dbConnect() {
  try {
    mongoose.connect(process.env.MONGO_DB_API_KEY)

    return mongoose.connection
  } catch (error) {
    console.log(error)
  }
}
