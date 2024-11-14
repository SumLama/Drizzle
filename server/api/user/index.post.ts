import useDb from "~/server/utils/db"
import { user } from "~/server/db/schema"
import { z } from "zod"

const userSchema = z.object({
    firstName : z.string().min(1,{message:'Firstname is required'}),
    lastName : z.string().min(1,{message:'Lastname is required'}),
    address : z.string().min(1,{message:'Address is required'})

})
export default defineEventHandler(async(event)=>{
    try{
     const body = await readBody(event)
     console.log("Body:",body)
     if(body){
     const validatedData = userSchema.parse(body)   
     const res = await useDb().insert(user).values(validatedData)
     return res
     }

    } catch(err){
        if(err) throw err
    }
})


