import express, {Express, Response, Request} from 'express'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const app :Express = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT

app.get('/', (req : Request, res : Response)=>{
    res.send({msg: "Hello from Privv Backend"})
})



app.listen(PORT, ()=>{
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)
})
