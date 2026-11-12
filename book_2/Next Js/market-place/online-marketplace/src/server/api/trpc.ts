import { initTRPC, TRPCError } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getAuth } from "@clerk/nextjs/server";
import superjson from "superjson";

import { db } from "~/server/db";

interface AuthContext {
  userId: string | null;
}

export const createTRPCContext = async ({
  req
}: CreateNextContextOptions) => {
  const auth = getAuth(req);

  return {
    db,
    auth: {
      userId: auth.userId,
    } satisfies AuthContext,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be signed in to perform this action.",
    });
  }

  return next({
    ctx: {
      auth: {
        userId: ctx.auth.userId,
      },
    },
  });
});