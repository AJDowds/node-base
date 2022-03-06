import "dotenv/config"
import cors from "cors"
import bodyParser from "body-parser"
import express from "express"
import routes from "./routes"

// Server Setup
const app = express()
const server = require("http").createServer(app)
server.listen(3001)

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Routes
app.use("/auth", routes.auth)

// Run migrations
// const eraseDatabaseOnSync = true
// sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
//   if (eraseDatabaseOnSync) {
//     migration()
//   }
// })
