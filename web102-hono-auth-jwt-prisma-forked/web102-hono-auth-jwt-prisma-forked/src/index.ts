import { Hono } from "hono";
import { cors } from "hono/cors";
import { PrismaClient } from "@prisma/client";

const app = new Hono();
const prisma = new PrismaClient();

// Enable CORS for all routes
app.use("/*", cors());

app.get("/:userId/account/balance", async (c) => {
  const { userId } = c.req.param();

  // fetch user account data 
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { Account: { select: { balance: true, id: true } } },
  });

  return c.json({ data: user });
});

app.post("/register", async (c) => {
  try {
    const body = await c.req.json();

    const user = await prisma.user.create({
      data: {
        email: body.email,
        hashPassword: hashedPassword,
        Account: {
          create: {
            balance: 0,
          },
        },
      },
    });

    return c.json({ message: `${user.email} created successfully` });
  } catch (e) {
    return c.json({ message: "Error creating user", error: e });
  }
});

export default app;