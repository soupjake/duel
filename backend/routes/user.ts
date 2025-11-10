import { Router } from "express"

export const user = Router()

user.get('/', (req, res) => {
  res.send('List of users')
});

user.get('/:id', (req, res) => {
  const userId = req.params.id
  res.send(`Details of user ${userId}`)
});

