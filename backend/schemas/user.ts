import mongoose from "mongoose"
import fs from "fs"
import path from "path"

export const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    nullable: true
  },
  name: {
    type: String,
    nullable: true
  },
  email: {
    type: String,
    nullable: true
  },
  instagram_handle: {
    type: String,
    nullable: true
  },
  tiktok_handle: {
    type: String,
    nullable: true
  },
  joined_at: {
    type: String,
    nullable: true
  },
  advocacy_programs: {
    type: Array,
    nullable: true
  },
})

export const CleanUser = mongoose.model("CleanUser", userSchema)
export const DirtyUser = mongoose.model("DirtyUser", userSchema)

export async function seedCleanUsers() {
  const dataPath = path.resolve(process.cwd(), "data/clean_data.json")

  if (fs.existsSync(dataPath)) {
    const raw = fs.readFileSync(dataPath, "utf8")
    const users = JSON.parse(raw)

    const count = await CleanUser.countDocuments()

    if (count === 0) {
      await CleanUser.insertMany(users)

      console.log("Clean users seeded")
    }
  } else {
    console.log("No seed file found")
  }
}

export async function seedDirtyUsers() {
  const dataPath = path.resolve(process.cwd(), "data/dirty_data.json")

  if (fs.existsSync(dataPath)) {
    const raw = fs.readFileSync(dataPath, "utf8")
    const users = JSON.parse(raw)

    const count = await DirtyUser.countDocuments()

    if (count === 0) {
      await DirtyUser.insertMany(users)

      console.log("Dirty users seeded")
    }
  } else {
    console.log("No seed file found")
  }
}
