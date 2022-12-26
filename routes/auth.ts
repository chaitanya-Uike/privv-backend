import express, { Response, Request } from 'express'
import prisma from '../lib/prisma'
import UserSchema from '../validation/User'
import generateUsername from '../lib/randomNameGenerator'
import { generateAvatar } from '../lib/randomAvatarGenerator'
import { StatusCodes } from 'http-status-codes'
import JWT from 'jsonwebtoken'

const router = express.Router()

router.post('/register', async (req: Request, res: Response) => {
    const data = req.body
    data.username = generateUsername()
    data.profile_img = generateAvatar()

    const validation = UserSchema.safeParse(data)
    if (!validation.success)
        return res.send(validation)

    try {
        const userExists: boolean = await prisma.user.findFirst({
            where: { email: validation.data.email }
        }).then(r => Boolean(r))

        if (userExists) {
            return res.status(StatusCodes.BAD_REQUEST).send({ success: false, msg: "user with email already exists" })
        }

        const user = await prisma.user.create({
            data: {
                email: validation.data.email,
                username: validation.data.username,
                password: validation.data.password,
                profile_img: validation.data.profile_img
            }
        })

        const payload = { id: user.id }
        const accessToken = JWT.sign(payload, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '30d'
        })

        return res.status(StatusCodes.CREATED).send({
            success: true,
            accessToken,
            username: user.username,
            id: user.id,
            msg: "user created successfully"
        })
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).send({ success: false, "msg": "unable to create user successfully", error })
    }
})

export default router;