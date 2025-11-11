import { promises as fs } from "fs"

export async function saveToFile(data: any, outPath: string) {
  await fs.writeFile(outPath, JSON.stringify(data, null, 2), "utf8")
  console.log(`Saved ${data.length} records to ${outPath}`)
}