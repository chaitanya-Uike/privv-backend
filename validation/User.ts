import { z } from 'zod'

const UserSchema = z.object({
    email: z.string().email("provide a valid email address"),
    username: z.string(),
    password: z.string().min(6, "password must have atleast 6 characters"),
    profile_img: z.string()
})

export default UserSchema;