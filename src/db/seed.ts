import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { users } from "./schema.ts";
import process from "node:process";
import hashPassword from "../helpers/hash.ts";

config({
    path: '.env'
})

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
    await db.insert(users).values([
        {
            name: 'raya',
            email: 'raya.secondary@gmail.com',
            password: await hashPassword('supersecretpassword'),
        },
        {
            name: 'fika',
            email: 'fikarisma@gmail.com',
            password: await hashPassword('supersecretpassword'),
        },
    ]);
}

async function main() {
    try {
        await seed();
    } catch(error) {
        console.error('Error during seeding: ', error);
        process.exit(1);
    }
}

main();