// we import app that we have previously created and exported in server.js. 
// We import mongodb to access our database and dotenv to access our environment variables
import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"

// We create an asynchronous function main() to connect to our MongoDB cluster and call functions that access our database
async function main() {
    // we call dotenv.config() to load in the environment variables
    dotenv.config()
    // we create an instance of MongoClient and pass in the database URI
    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI
    )
    // We retrieve the port from our environment variable
    const port = process.env.PORT || 8000
    try {
        // Connect to the MongoDB cluster
        await client.connect()
        app.listen(port, () => {
            console.log('server is running on port:' + port);
        })
    } catch (e) {
        console.error(e);
        process.exit(1)
    }
}
main().catch(console.error);