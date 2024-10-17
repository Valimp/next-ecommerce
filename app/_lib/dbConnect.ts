import mongoose, { Mongoose } from 'mongoose'

declare global {
    var mongoose: {
        promise: Promise<Mongoose> | null;
        conn: Mongoose | null;
    };
}

const MONGODB_URI = process.env.MONGODB_URI || ''

let cached = global.mongoose
if (!cached) {
  cached = global.mongoose = { promise: null, conn: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
        return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect
