import { MongoClient, ServerApiVersion } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) throw new Error('mongodb connection string missing');

const client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
} );


enum DBs
{ 
  METADATA = 'metadata',
  CLIENT_DATA = 'client-data'
}

enum COLLECTIONS
{
  ZIPCODES = 'location-cluster',
  ACCOUNTS = 'client-account',
  LISTINGS = 'marketplace-listings'
}

const dbs = {
  metadata: {
    dbName: 'metadata',
    collections: {
      zipcodes: 'location-cluster'
    },
  },
  client: {
    dbName: 'client-data',
    collections: {
      account: 'client-account',
      listings: 'marketplace-listings'
    }
  }
}

export { client, dbs, DBs, COLLECTIONS };
