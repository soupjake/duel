import { promises as fs } from "fs"
import path from "path"
import { v4 as uuid } from "uuid"
import { User } from "./types"

function validateData(input: any) {
  let data = { ...input }

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

function parseRaw(raw: string) {
  const parsed = tryParse(raw)

  if (
    parsed.status === "error" &&
    parsed.data.includes("Expected ',' or '}'")
  ) {
    return tryParse(raw.trim() + "}")
  }

  return parsed
}


async function loadAndCleanData(dirPath: string) {
  const readFiles = await fs.readdir(dirPath)
  const files = readFiles.filter(f => f.startsWith("user_") && f.endsWith(".json"))

  console.log(`Found ${files.length} user files. Processing...`)

  const cleanUsers: User[] = []
  const dirtyUsers: any[] = []

  const processFile = async (file: string) => {
    try {
      const raw = await fs.readFile(path.join(dirPath, file), "utf8")
      const { status, data } = parseRaw(raw)

      switch (status) {
        case "ok":
          cleanUsers.push(data)
          break
        case "invalid":
          dirtyUsers.push(data)
          break
        case "error":
          console.warn(`JSON parse error in ${file}: ${data}`)
          break
      }
    } catch (err) {
      console.error(`Error processing ${file}:`, err)
    }
  }

  await Promise.allSettled(files.map(processFile))

  console.log(`Processed ${cleanUsers.length} clean users.`)
  console.log(`Processed ${dirtyUsers.length} dirty users.`)

  return { cleanUsers, dirtyUsers }
}


async function saveToFile(data: any[], outPath: string) {
  await fs.writeFile(outPath, JSON.stringify(data, null, 2), "utf8")
  console.log(`Saved ${data.length} records to ${outPath}`)
}


async function main() {
  const dataDir = path.resolve("../../data/mixed")
  const cleanPath = path.resolve("../output/clean_data.json")
  const dirtyPath = path.resolve("../output/dirty_data.json")

  const { cleanUsers, dirtyUsers } = await loadAndCleanData(dataDir)

  await saveToFile(cleanUsers, cleanPath)
  await saveToFile(dirtyUsers, dirtyPath)

  console.log("Data processing complete!")
}

main().catch(err => {
  console.error("Unhandled error in main:", err)
})
