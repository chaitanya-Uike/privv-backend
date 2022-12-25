import express, {Express, Response, Request} from 'express'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient();

const app :Express = express()

const PORT = process.env.PORT



app.listen(PORT, ()=>{console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`)})
