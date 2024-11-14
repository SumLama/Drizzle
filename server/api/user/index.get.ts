import useDb from "~/server/utils/db"
import { user } from "~/server/db/schema"
export default defineEventHandler(async(event)=>{
    try{
    const res = await useDb().select().from(user)
   return res
    } catch(error){
        console.log("error:",error)
    }  
})