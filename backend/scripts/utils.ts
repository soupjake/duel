import { promises, existsSync, readFileSync } from "fs"
import { v4 as uuid } from "uuid"
import path from "path"
import { Model } from "mongoose"

export async function saveToFile(data: any, outPath: string) {
  await promises.writeFile(outPath, JSON.stringify(data, null, 2), "utf8")
  console.log(`Saved records to ${outPath}`)
}

function validateData(data: any) {
  if (!data.user_id) {
    data.user_id = uuid()
  }

  if (!data.name || data.name === "???") {
    return false
  }

  if (!data.email || data.email === "invalid-email") {
    return false
  }

  if (!data.joined_at || data.joined_at === "not-a-date") {
    return false
  }

  if (!data.instagram_handle?.startsWith("@")) {
    data.instagram_handle = ""
  }

  if (!data.tiktok_handle?.startsWith("@")) {
    data.tiktok_handle = ""
  }

  return true
}

function tryParse(input: string) {
  try {
    let parsed = JSON.parse(input)
    
    if (validateData(parsed)) {
      return { status: "ok", data: parsed }
    } else {
      return { status: "invalid", data: parsed }
    }
  } catch (err: any) {
    return { status: "error", data: err.message }
  }
}

export function parseRaw(raw: string) {
  const parsed = tryParse(raw)

  if (
    parsed.status === "error" &&
    parsed.data.includes("Expected ',' or '}'")
  ) {
    return tryParse(raw.trim() + "}")
  }

  return parsed
}

export async function seedModel<T>(model: Model<T>, filename: string) {
  const dataPath = path.resolve(process.cwd(), `output/${filename}`)

  if (!existsSync(dataPath)) {
    console.warn(`No seed file found`)
    return
  }

  const raw = readFileSync(dataPath, "utf8")
  const users = JSON.parse(raw)
  const count = await model.countDocuments()

  if (count === 0) {
    await model.insertMany(users)
    console.log(`Seeded ${users.length} items`)
  } else {
    console.log(`Collection already contains ${count} documents`)
  }
}
