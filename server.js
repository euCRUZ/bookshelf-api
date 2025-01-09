import "dotenv/config"
import app from "./src/app.js"
import { config } from "dotenv"

config()

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT)
})
