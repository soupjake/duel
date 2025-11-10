import { Router } from "express"

export const router = Router()

router.get('/health', (req, res) => {
  res.send('ok')
});

router.get('/users', (req, res) => {
  res.send('List of users')
});

router.get('/users/:id', (req, res) => {
  const userId = req.params.id
  res.send(`Details of user ${userId}`)
});

router.post('/users', (req, res) => {
  res.send('Create a new user')
});

router.put('/users/:id', (req, res) => {
  const userId = req.params.id
  res.send(`Update user ${userId}`)
});

router.delete('/users/:id', (req, res) => {
  const userId = req.params.id
  res.send(`Delete user ${userId}`)
});

