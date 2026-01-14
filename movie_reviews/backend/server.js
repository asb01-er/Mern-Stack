// We first import the express and cors middleware
import express from 'express'
import cors from 'cors'
// We also import movie.route.js which is a separate file we
// will create later to store our routes
import movies from './api/movies.route.js'

// we than create server with
const app = express()

// cors and express.json middleware that express will use with
// express.json is the JSON parsing middleware to enable the server to read and accept JSON in a request’s
// body.
app.use(cors())
app.use(express.json())

// We then specify the initial routes:
app.use("/api/v1/movies", movies)
// Catch-all 404 route

// app.use('/*', (req, res) => {
//   res.status(404).json({ error: "not found" });
// })

app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});


// export app as a module so that other files can import it
export default app