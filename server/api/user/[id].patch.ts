import {useDb} from "~/server/utils/db"
import { user } from '../../db/schema'
import { eq } from "drizzle-orm"
import { z } from "zod"
const userSchema = z.object({
    firstName : z.string().trim().min(1,{message:"Firstname is required"}),
    lastName : z.string().trim().min(1,{message:"Lastname is required"}),
    address : z.string().trim().min(1,{message:"Address is required"})

})
export default defineEventHandler(async(event)=>{
    const id = Number(getRouterParam(event,'id'))
    try{
     const body = await readBody(event)
     if(body){
     const validatedData = userSchema.parse(body)   
     const res = await useDb().update(user).set(validatedData).where(eq(user.id,id))
     return res
     }

    } catch(error:any){
        throw createError({
            statusCode: 400,
            statusMessage: error.issues? error.issues[0].message: error.message,
          })
    }
})
