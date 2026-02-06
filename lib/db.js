import clientPromise from "./mongodb";

const DB_NAME = "hatbari";

export async function getDb() {
  const client = await clientPromise;
  return client.db(DB_NAME);
}

export { clientPromise };
