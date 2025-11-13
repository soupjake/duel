import { Router } from "express"
import { CleanUser, DirtyUser } from "../schemas/user"
import { UserMetrics } from "../schemas/metric"

export const user = Router()

user.get("/clean", async (req, res) => {
  try {
    const users = await CleanUser.find()

    res.json(users)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" })
  }
})

user.get("/clean/:id", async (req, res) => {
  try {
    const user = await CleanUser.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(user)
  } catch (err) {
    res.status(500).json({ error: "Error fetching user" })
  }
})

user.get("/dirty", async (req, res) => {
  try {
    const users = await DirtyUser.find()

    res.json(users)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" })
  }
})

user.get("/dirty/:id", async (req, res) => {
  try {
    const user = await DirtyUser.findById(req.params.id)

    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.json(user)
  } catch (err) {
    res.status(500).json({ error: "Error fetching user" })
  }
})

user.get("/metrics", async (req, res) => {
  try {
    const metrics = await UserMetrics.find()

    res.json(metrics)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user metrics" })
  }
})