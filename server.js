const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

async function startServer() {
    try {
        await MongoDB.connect(config.db.uri);
        console.log("Connected to DB!");

        const PORT = config.app.port;
        app.listen(PORT, ()=>{
            console.log(`App is running on port ${PORT}`);
        })
    } catch (error) {
        console.log('Error connecting to database: ', error);
        process.exit;
    }
}

startServer();
