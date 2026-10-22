import { createNextApiHandler } from "@trpc/server/adapters/next";
import type { TRPCError } from "@trpc/server";

import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";
import { env } from "~/env";

export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,

  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }: { path?: string; error: TRPCError }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`,
          );
        }
      : undefined,
});