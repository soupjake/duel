import express from "express";
import { health } from "./routes/health";
import { user } from "./routes/user";

const app = express()
const port = 3000

app.use('/health', health)
app.use('/user', user)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
});

