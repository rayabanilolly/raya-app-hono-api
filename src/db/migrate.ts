import { migrate } from 'drizzle-orm/neon-http/migrator';
import { neon } from '@neondatabase/serverless';
import { config } from 'dotenv';
import process from 'node:process';
import { drizzle } from "drizzle-orm/neon-http";

config({
    path: '.env'
});

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const main = async() => {
    try {
        await migrate(db, { migrationsFolder: 'drizzle' })
    } catch(error) {
        console.error('Error during migration: ', error);
        process.exit(1);
    }
}

main();