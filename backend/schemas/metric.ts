import mongoose, { Model } from "mongoose"
import fs from "fs"
import path from "path"
import { Metrics } from "../types/metric"
import { seedModel } from "../scripts/utils"

const metricsSchema = new mongoose.Schema<Metrics>({
  mostLiked: {
    user_id: { type: String, default: "" },
    value: { type: Number, default: 0 }
  },
  mostCommented: {
    user_id: { type: String, default: "" },
    value: { type: Number, default: 0 }
  },
  mostShared: {
    user_id: { type: String, default: "" },
    value: { type: Number, default: 0 }
  }
})


export const UserMetrics = mongoose.model<Metrics>("UserMetrics", metricsSchema)


export async function seedUserMetrics() {
  return seedModel(UserMetrics, "metric_data.json")
}


