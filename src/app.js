import express from "express"
import dbConnect from "./config/dbConnect.js"
import routes from "./routes/index.js"

const connection = await dbConnect()

connection.on("error", (error) => {
  console.error("Connection to DATABASE failed: ", error)
})

connection.once("open", () => {
  console.log("Connected to DATABASE!")
})

const app = express()
routes(app)

export default app
