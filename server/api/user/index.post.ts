import {useDb} from "~/server/utils/db"
import { user } from "~/server/db/schema"
import { z, ZodError } from "zod"

const userSchema = z.object({
    firstName : z.string().trim().min(1,{message:"Firstname is required"}),
    lastName : z.string().trim().min(1,{message:"Lastname is required"}),
    address : z.string().trim().min(1,{message:"Address is required"})
})
export default defineEventHandler(async(event)=>{
    try{
     const body = await readBody(event)
     if(body){
     const validatedData = userSchema.parse(body)   
     const res = await useDb().insert(user).values(validatedData)
     return res
     }

    } catch(error:any){
        throw createError({
            statusCode: 400,
            statusMessage: error.instanceof(ZodError)?error.issues[0].message: error.message,
        })
    }
})


