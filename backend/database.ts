import mongoose from "mongoose"
import { MongoMemoryServer } from "mongodb-memory-server"
import { seedCleanUsers, seedDirtyUsers } from "./schemas/user"
import { seedUserMetrics } from "./schemas/metric"

export async function connectDB() {
  const mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()

  await mongoose.connect(uri)

  console.log("Connected to in-memory MongoDB")

  await seedCleanUsers()
  await seedDirtyUsers()
  await seedUserMetrics()
}
