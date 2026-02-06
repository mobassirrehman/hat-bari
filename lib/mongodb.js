import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!uri) {
  // 🟢 FIX: Instead of crashing, we check if we are in "production" (Vercel Build)
  // If the URI is missing, we just log a warning and return a dummy promise.
  // This allows the build to finish successfully.
  console.warn("⚠️ MONGODB_URI is missing. This is fine during build time.");

  // A dummy promise that will reject ONLY if you try to use it
  clientPromise = Promise.reject(
    new Error("Database not connected: Missing MONGODB_URI")
  );
} else {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri, options);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
  }
}

export default clientPromise;
