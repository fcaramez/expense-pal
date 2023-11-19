import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "@/server/db";

const updateUserSchema = z.object({
  userId: z.string(),
  email: z.string().email(),
  username: z.string(),
  avatar: z.string(),
  income: z.number(),
});

type ResponseType = Promise<{
  message?: string;
  success: boolean;
  data?: Record<string, string | number>;
}>;

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input: { userId } }): ResponseType => {
      try {
        if (!userId) {
          return {
            success: false,
            message: "Bad Request",
          };
        }

        const userToFind = await db.user.findFirst({
          where: {
            id: userId,
          },
        });

        if (!userToFind) {
          return {
            success: false,
            message: "User not found",
          };
        }

        return {
          data: { ...userToFind },
          success: true,
        };
      } catch (_error) {
        return {
          message: "Internal Server Error",
          success: false,
        };
      }
    }),
  deleteUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input: { userId } }): ResponseType => {
      try {
        if (!userId) {
          return {
            success: false,
            message: "Bad Request",
          };
        }

        const userToFind = await db.user.findFirst({
          where: {
            id: userId,
          },
        });

        if (!userToFind) {
          return {
            message: "User not found",
            success: false,
          };
        }

        const postsToDelete = await db.post.findMany({
          where: {
            userId,
          },
          select: {
            id: true,
          },
        });

        await db.post.deleteMany({
          where: {
            userId,
          },
        });

        await db.comment.deleteMany({
          where: {
            userId,
          },
        });

        const idToDelete = Object.values(postsToDelete).map((val) => val.id);

        await db.postImages.deleteMany({
          where: {
            postId: {
              in: idToDelete,
            },
          },
        });

        return {
          success: true,
        };
      } catch (_error) {
        return {
          message: "Internal Server Error",
          success: false,
        };
      }
    }),
  updateUser: publicProcedure
    .input(updateUserSchema)
    .mutation(
      async ({
        input: { userId, email, username, income, avatar },
      }): ResponseType => {
        try {
          if (!userId) {
            return {
              success: false,
              message: "Bad request",
            };
          }

          const data = {
            email,
            username,
            income,
            avatar,
          };

          await db.user.update({
            where: {
              id: userId,
            },
            data,
          });

          return {
            success: true,
            message: "User updated",
          };
        } catch (_error) {
          return {
            success: false,
            message: "Internal Server Error",
          };
        }
      },
    ),
});
