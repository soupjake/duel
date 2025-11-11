import mongoose, { Document, Model } from "mongoose"
import fs from "fs"
import path from "path"


export interface User extends Document {
  user_id?: string
  name?: string
  email?: string
  instagram_handle?: string
  tiktok_handle?: string
  joined_at?: string
  advocacy_programs?: []
}

const userSchema = new mongoose.Schema<User>({
  user_id: { type: String, default: null },
  name: { type: String, default: null },
  email: { type: String, default: null },
  instagram_handle: { type: String, default: null },
  tiktok_handle: { type: String, default: null },
  joined_at: { type: String, default: null },
  advocacy_programs: { type: [], default: [] },
})

// Create models
export const CleanUser = mongoose.model<User>("CleanUser", userSchema)
export const DirtyUser = mongoose.model<User>("DirtyUser", userSchema)

// ---- Reusable seeding helper ----
async function seedCollection(model: Model<User>, filename: string, label: string) {
  const dataPath = path.resolve(process.cwd(), `data/${filename}`)

  if (!fs.existsSync(dataPath)) {
    console.warn(`No ${label} seed file found.`)
    return
  }

  const raw = fs.readFileSync(dataPath, "utf8")
  const users = JSON.parse(raw)
  const count = await model.countDocuments()

  if (count === 0) {
    await model.insertMany(users)
    console.log(`Seeded ${users.length} ${label} users.`)
  } else {
    console.log(`${label} collection already contains ${count} documents.`)
  }
}


export async function seedCleanUsers() {
  return seedCollection(CleanUser, "clean_data.json", "Clean")
}

export async function seedDirtyUsers() {
  return seedCollection(DirtyUser, "dirty_data.json", "Dirty")
}
