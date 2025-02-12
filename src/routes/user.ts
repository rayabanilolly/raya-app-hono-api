import { Hono } from "hono";
import { env } from "node:process";
import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { users } from "../db/schema.ts";
import hashPassword from "../helpers/hash.ts";
import { eq } from 'drizzle-orm';

config({
    path: '.env'
})

const userRoutes = new Hono();

const sql = neon(env.DATABASE_URL!);
const db = drizzle(sql);

userRoutes.get('/', (c) => {
    return c.json({ message: 'User list' });
});

userRoutes.post('/', async(c) => {
    const formData = await c.req.formData();
    const name = formData.get('name');
    const email = formData.get('email');

    await db.insert(users).values([
        {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: await hashPassword('supersecretpassword'),
        }
    ]);

    return c.json({ message: 'User created', user: { name, email } }, 201);
});

userRoutes.patch('/:id', async(c) => {
    const formData = await c.req.formData();

    const name = formData.get('name');
    const email = formData.get('email');

    await db.update(users)
        .set({ name: name as string, email: email as string })
        .where(eq(users.id, +c.req.param().id));

    return c.json({ message: 'User updated' });
});

userRoutes.get('/:id', (c) => {
    return c.json({ message: 'User detail' });
});

export default userRoutes;