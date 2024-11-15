import { drizzle as drizzleD1, DrizzleD1Database } from 'drizzle-orm/d1'
import { drizzle, BetterSQLite3Database } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import { join } from 'pathe'

let _db: DrizzleD1Database | BetterSQLite3Database | null = null

export const useDb = () => {
  if (!_db) {
    if (process.env.D1) {
      // Use D1 database in production environment
      _db = drizzleD1(process.env.D1)
    } else if (import.meta.dev) {
      // Use local SQLite database in development environment
      const { dbDir } = useRuntimeConfig()
      const sqlite = new Database(join(dbDir, './db.sqlite'))
      _db = drizzle(sqlite)
    } else {
      throw new Error('No database configured for production or development')
    }
  }
  return _db
}
