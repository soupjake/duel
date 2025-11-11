import { Router } from "express"

export const health = Router()

health.get('/', (req, res) => {
  res.send({ status: "ok" })
});