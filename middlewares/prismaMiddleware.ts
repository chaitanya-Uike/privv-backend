import { Prisma } from "@prisma/client";
import * as bcrypt from 'bcrypt';

export const HashPassword : Prisma.Middleware = async (params : Prisma.MiddlewareParams, next)=>{
    if(params.action === 'create' && params.model === 'User'){
        const user = params.args.data
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(user.password, salt)
        user.password = hash
    }
    return await next(params);
}