import useDb from "~/server/utils/db"
import { user } from "~/server/db/schema"
import { eq } from "drizzle-orm"
export default defineEventHandler(async(event)=>{
   const id = Number(getRouterParam(event,'id'))
    try{
    const res = await useDb().delete(user).where(eq(user.id,id))
   return res
    } catch(error){
        console.log("error:",error)
    }  
})