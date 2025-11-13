import { promises as fs } from "fs"
import path from "path"
import { parseRaw, saveToFile } from "./utils"
import { User } from "../types/user"

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


async function main() {
  console.log("Starting processing data...")

  const dataDir = path.resolve("../../data/mixed")
  const cleanPath = path.resolve("../output/clean_data.json")
  const dirtyPath = path.resolve("../output/dirty_data.json")

  const { cleanUsers, dirtyUsers } = await loadAndCleanData(dataDir)

  await saveToFile(cleanUsers, cleanPath)
  await saveToFile(dirtyUsers, dirtyPath)

  console.log("Processing data complete!")
}

main().catch(err => {
  console.error("Unhandled error in main:", err)
})
