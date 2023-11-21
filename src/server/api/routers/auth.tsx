import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { z } from "zod";


import { env } from "@/env.mjs";
import { db } from "@/server/db";
import { type ResponseType } from "@/types";

import { createTRPCRouter, publicProcedure } from "../trpc";

const signupSchema = z.object({
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
  avatar: z.string(),
  income: z.number(),
});

const { TOKEN_SECRET } = env;

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(signupSchema)
    .mutation(
      async ({
        input: { email, username, password, avatar, income },
      }): ResponseType => {
        try {
          let imageUrl: string;
          if (!email || !username || !password) {
            return {
              success: false,
              message: "Bad Request",
            };
          }

          const userExists = await db.user.findFirst({
            where: {
              email,
            },
          });

          if (userExists) {
            return {
              success: false,
              message: "User already exists, please login",
            };
          }

          if (!avatar) {
            imageUrl = `https://ui-avatars.com/api/?name=${username}&background=random`;
          } else {
            imageUrl = avatar;
          }

          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = await db.user.create({
            data: {
              email,
              username,
              income: income || 0,
              avatar: imageUrl,
              password: hashedPassword,
            },
          });

          const payload = {
            userId: newUser.id,
            username,
            email,
          };

          const token = jwt.sign(payload, TOKEN_SECRET);

          return {
            message: `Welcome, ${newUser.username}!`,
            data: { ...newUser },
            success: true,
            token,
          };
        } catch (_error) {
          return {
            message: "Internal Server Error",
            success: false,
          };
        }
      },
    ),
});
