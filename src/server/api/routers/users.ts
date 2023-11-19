import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { db } from "@/server/db";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input: { userId } }) => {
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
          user: { ...userToFind },
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
    .mutation(async ({ input: { userId } }) => {
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
      } catch (_error) {}
    }),
});
