import mongoose from "mongoose";

const MONGODB = process.env.MONGO_URI;

if (!MONGODB) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB, {
        useNewUrlParser: true, // Ensures MongoDB URI parser is used
        serverSelectionTimeoutMS: 5000, // 5 seconds timeout for server selection
        socketTimeoutMS: 45000, // 45 seconds timeout for socket
        connectTimeoutMS: 10000, // 10 seconds connection timeout
      })
      .then((mongoose) => {
        console.log("Db connected");
        return mongoose;
      })
      .catch((error) => {
        console.error("DB connection error: ", error);
      });
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
