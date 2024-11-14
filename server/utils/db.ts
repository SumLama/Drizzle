import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
 const useDb = ()=>{
    const dbDir = './server/db'
    const dbName = 'db.sqlite'
    const sqlite = new Database(`${dbDir}/${dbName}`)
    const db = drizzle(sqlite)
    return db
 }
 export default useDb