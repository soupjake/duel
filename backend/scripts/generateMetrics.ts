
import path from "path"
import fs from "fs"
import { saveToFile } from "./utils"

async function generateMetrics(dataPath: string) {
  const raw = fs.readFileSync(dataPath, "utf8")
  const users = JSON.parse(raw)

  let mostLiked = ""
  let mostCommented = ""
  let mostShared = ""

  let maxLikes = 0
  let maxComments = 0
  let maxShares = 0

  for (const user of users) {
    if (!user.user_id || !user.advocacy_programs?.length) {
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
        if (task) {
          totalLikes += task.likes ?? 0
          totalComments += task.comments ?? 0
          totalShares += task.shares ?? 0
        }
      }
    }

    if (totalLikes > maxLikes) {
      maxLikes = totalLikes
      mostLiked = user.user_id
    }

    if (totalComments > maxComments) {
      maxComments = totalComments
      mostCommented = user.user_id
    }

    if (totalShares > maxShares) {
      maxShares = totalShares
      mostShared = user.user_id
    }
  }

  return { 
    mostLiked: {
      user_id: mostLiked,
      value: maxLikes
    },
    mostCommented: {
      user_id: mostCommented,
      value: maxComments
    },
    mostShared: {
      user_id: mostShared,
      value: maxShares
    }
  }
}


async function main() {
  console.log("Starting generating metrics...")

  const cleanPath = path.resolve("../output/clean_data.json")
  const metricsPath = path.resolve("../output/metric_data.json")

  const metrics = await generateMetrics(cleanPath)

  await saveToFile(metrics, metricsPath)

  console.log("Generating metrics complete!")
}

main().catch(err => {
  console.error("Unhandled error in main:", err)
})