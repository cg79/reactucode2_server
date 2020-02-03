const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = "mongodb://localhost:27017/cursjs";

class MongoService {
    // db = null;
    constructor() {
        this.db = null;
    }
    
    async connectToDB(dbName){
        const mongoConnection = await MongoClient.connect(MONGO_URL);
        this.db = mongoConnection.db(dbName || myDatabaseNameAsAString);
        console.log("Database connection established")
        return this.db;

    }
}

module.exports = new MongoService()
