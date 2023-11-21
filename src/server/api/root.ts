import { createTRPCRouter } from "@/server/api/trpc";

import { authRouter } from "./routers/auth";
import { userRouter } from "./routers/users";

export const appRouter = createTRPCRouter({
  user: userRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
