
import path from "path"
import fs from "fs"
import { saveToFile } from "./utils"
import { User } from "./types"


async function generateMetrics(dataPath: string) {
  const raw = fs.readFileSync(dataPath, "utf8")
  const users = JSON.parse(raw)

  let mostLiked: User | null = null
  let mostCommented: User | null = null
  let mostShared: User | null = null

  let maxLikes = 0
  let maxComments = 0
  let maxShares = 0

  for (const user of users) {
    if (!user.advocacy_programs?.length) {
      continue
    }

    let totalLikes = 0
    let totalComments = 0
    let totalShares = 0

    for (const program of user.advocacy_programs) {
      if (!program?.tasks_completed?.length) {
        continue
      }

      for (const task of program.tasks_completed) {
        const likes = typeof task?.likes === "string" ? parseInt(task.likes) : task?.likes ?? 0
        const comments = task?.comments ?? 0
        const shares = task?.shares ?? 0

        totalLikes += likes || 0
        totalComments += comments || 0
        totalShares += shares || 0
      }
    }

    if (totalLikes > maxLikes) {
      maxLikes = totalLikes
      mostLiked = user
    }
    if (totalComments > maxComments) {
      maxComments = totalComments
      mostCommented = user
    }
    if (totalShares > maxShares) {
      maxShares = totalShares
      mostShared = user
    }
  }

  return { mostLiked, mostCommented, mostShared }
}


async function main() {
  console.log("Starting generating metrics...")

  const cleanPath = path.resolve("../output/clean_data.json")

  const metrics = await generateMetrics(cleanPath)

  await saveToFile(metrics, cleanPath)

  console.log("Generated metrics!")
}

main().catch(err => {
  console.error("Unhandled error in main:", err)
})