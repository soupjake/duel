import mongoose from "mongoose"
import { User } from "../types/user"
import { seedModel } from "../scripts/utils"

const userSchema = new mongoose.Schema<User>({
  user_id: { type: String, default: null },
  name: { type: String, default: null },
  email: { type: String, default: null },
  instagram_handle: { type: String, default: null },
  tiktok_handle: { type: String, default: null },
  joined_at: { type: String, default: null },
  advocacy_programs: { type: [], default: [] },
})


export const CleanUser = mongoose.model<User>("CleanUser", userSchema)
export const DirtyUser = mongoose.model<User>("DirtyUser", userSchema)


export async function seedCleanUsers() {
  return seedModel(CleanUser, "clean_data.json")
}

export async function seedDirtyUsers() {
  return seedModel(DirtyUser, "dirty_data.json")
}
