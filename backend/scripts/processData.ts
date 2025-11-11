import { promises as fs } from "fs"
import path from "path"
import { User } from "./types"

function validateData(data: any): data is User {
  return (
    data.user_id
    // data.name &&
    // data.email &&
    // data.instagram_handle &&
    // data.tiktok_handle &&
    // data.joined_at &&
    // Array.isArray(data.advocacy_programs)
  )
}

function tryParse(input: string) {
  try {
    const parsed = JSON.parse(input)
    
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
  const cleanPath = path.resolve("../../data/clean_data.json")
  const dirtyPath = path.resolve("../../data/dirty_data.json")

  const { cleanUsers, dirtyUsers } = await loadAndCleanData(dataDir)

  await saveToFile(cleanUsers, cleanPath)
  await saveToFile(dirtyUsers, dirtyPath)

  console.log("Data processing complete!")
}

main().catch(err => {
  console.error("Unhandled error in main:", err)
})
