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
  TOKENS = 'tokens',
  ZIPCODES = 'location-cluster',
  ACCOUNTS = 'accounts',
  LISTINGS = 'marketplace-listings'
}


export { client, DBs, COLLECTIONS };
