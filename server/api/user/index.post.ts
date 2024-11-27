import {useDb} from "~/server/utils/db"
import { user } from "~/server/db/schema"
import { z, ZodError } from "zod"

const userSchema = z.object({
    firstName : z.string().trim().min(1,{message:"Firstname is required"}),
    lastName : z.string().trim().min(1,{message:"Lastname is required"}),
    address : z.string().trim().min(1,{message:"Address is required"})
})
export default defineEventHandler(async(event)=>{
     const body = await readValidatedBody(event, userSchema.parse) 
     const res = await useDb().insert(user).values(body)
     return res
})


