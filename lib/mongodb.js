// lib/mongodb.js

import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is not defined");

let cache = global.mongoose;
if (!cache) {
  cache = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cache.conn) return cache.conn;
  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, { bufferCommands: false });
  }
  cache.conn = await cache.promise;
  return cache.conn;
}
