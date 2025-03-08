import { MongoClient, ServerApiVersion } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) throw new Error('mongodb connection string missing');

const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}).connect();


const dbs = {
  metadata: {
    dbName: 'metadata',
    collections: {
      zipcodes: 'location-cluster'
    }
  }
}

export { client, dbs };
