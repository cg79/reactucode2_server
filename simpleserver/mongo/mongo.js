const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = "mongodb://localhost:27017/cursjs";

class MongoService {
    // db = null;
    constructor() {
        this.db = null;
    }
    
    async connectToDB(dbName) {
        console.log('sssssssssssssssssssssssssssssss ', MONGO_URL);
        try{
        const mongoConnection = await MongoClient.connect(MONGO_URL);
        this.db = mongoConnection.db(dbName || myDatabaseNameAsAString);
        console.log("-------------------------Database connection established")
        }
        catch(e) {
            console.log("exception ", e);
        }
        return this.db;

        // MongoClient.connect(MONGO_URL)
        // .then((connection) => {
        // 	console.log('okkkkkkkkkkkkkk');	
        // 	const myAwesomeDB = connection.db('myDatabaseNameAsAString');
        //     app.people = myAwesomeDB.collection("people");
        //     console.log("Database connection established")
        // })
        // .catch((err) => console.error(err)) 

    }
}

module.exports = new MongoService()
