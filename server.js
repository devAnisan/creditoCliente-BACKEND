import app from "./app.js"
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.SERVERPORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://${process.env.SERVERHOST}:${PORT}`)
})
