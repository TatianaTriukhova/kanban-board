import { MongoClient, Db } from 'mongodb';

const {
  MONGO_INITDB_DATABASE,
  MONGO_INITDB_ROOT_PASSWORD,
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_AUTH_DATABASE,
  MONGO_HOST,
} = process.env;
const MONGODB_URI = `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@${MONGO_HOST}:27017/${MONGO_INITDB_DATABASE}?authSource=${MONGO_AUTH_DATABASE}`;
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentiatlly
 * during API Route usage.
 */
interface Connection {
  client: MongoClient | undefined;
  db: Db | undefined;
}
let cached = global.mongo;
if (!cached) cached = global.mongo = {};

export default async function connectToDatabase(): Promise<Connection> {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const conn: { client: MongoClient | undefined; db: Db | undefined } = {
      client: undefined,
      db: undefined,
    };
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    cached.promise = MongoClient.connect(MONGODB_URI, opts)
      .then((client) => {
        conn.client = client;
        return client.db(MONGO_INITDB_DATABASE);
      })
      .then((db) => {
        conn.db = db;
        cached.conn = conn;
      });
  }
  await cached.promise;
  return cached.conn;
}
