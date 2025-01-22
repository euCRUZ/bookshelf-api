import express from "express"
import dbConnect from "./config/dbConnect.js"
import routes from "./routes/index.js"
import errorManipulator from "./middlewares/errorManipulator.js"
import manipulator404 from "./middlewares/manipulator404.js"

const connection = await dbConnect()

connection.on("error", (error) => {
  console.error("Connection to DATABASE failed: ", error)
})

connection.once("open", () => {
  console.log("Connected to DATABASE!")
})

const app = express()
routes(app)

app.use(manipulator404)

app.use(errorManipulator)

export default app
