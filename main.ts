import { Hono } from 'hono'
import userRoutes from "./src/routes/user.ts";

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/user', userRoutes);

Deno.serve(app.fetch)
