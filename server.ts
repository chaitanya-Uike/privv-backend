import express, { Express, Response, Request } from 'express'
import { createServer } from 'http'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import { HashPassword } from './middlewares/prismaMiddleware'
import prisma from './lib/prisma'
import { StatusCodes } from 'http-status-codes'

import authrouter from './routes/auth'

dotenv.config()

const app: Express = express()
const server = createServer(app)
const PORT = process.env.PORT

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.static('public'))
prisma.$use(HashPassword)

app.use('/auth', authrouter)

app.get('/', (req: Request, res: Response) => {
    res.send({ msg: "Hello from Privv Backend" })
})

app.get('/all-users', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            profile_img: true
        }
    })
    res.status(StatusCodes.OK).json({ data: users })
})

server.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`)
})
