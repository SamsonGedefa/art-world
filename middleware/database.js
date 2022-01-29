import { MongoClient } from "mongodb";

const { MONGODB_URI, DB_NAME } = process.env

if(!MONGODB_URI){
    throw new Error(
        'Undefined MongoDB URL'
    )
}


if(!DB_NAME){
    throw new Error(
        'Undefined Database Name'
    )
}

let cached = global.mongo
if(!cached) cached = global.mongo = {}


export async function connectToDatabase(){
    if(cached.conn) return cached.conn

    if(!cached.promise){
        const conn = {}
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }

        cached.promise = MongoClient.connect(MONGODB_URI, opts)
        .then((client) => {
            conn.client = client
            return client.db(DB_NAME)
        })
        .then((db) => {
            conn.db = db
            cached.conn = conn
        })
    }

    await cached.promise
    return cached.conn

}


