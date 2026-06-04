import { clerkClient } from "@clerk/nextjs/server";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const listingsRouter = createTRPCRouter({
  // Get all listings
  list: publicProcedure.query(({ ctx }) => {
    return ctx.db.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }),

  // Get single listing
  get: publicProcedure
    .input(
      z.object({
        listingId: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.listing.findUnique({
        where: {
          id: input.listingId,
        },
        include: {
          message: true,
        },
      });
    }),

  // Get messages for listings owned by current user
  getUserMessages: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId;

    const listings = await ctx.db.listing.findMany({
      where: {
        userId,
      },
      include: {
        message: true,
      },
    });

    return listings.flatMap((listing) => listing.message);
  }),

  // Send message to a listing
  sendMessage: protectedProcedure
    .input(
      z.object({
        message: z.string().min(1),
        listingId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.auth.userId;

      const client = await clerkClient();

      const fromUser = await client.users.getUser(userId);

      const fromUserName =
        fromUser.username ??
        fromUser.firstName ??
        fromUser.emailAddresses[0]?.emailAddress ??
        "unknown";

      return ctx.db.message.create({
        data: {
          fromUser: userId,
          fromUserName,
          listingId: input.listingId,
          message: input.message,
        },
      });
    }),

  // Create listing
  create: protectedProcedure
  .input(
    z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      price: z.coerce.number().positive(),
      imageUrl: z.string().optional(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    return ctx.db.listing.create({
      data: {
        name: input.name,
        description: input.description,
        price: input.price,
        imageUrl: input.imageUrl,
        userId: ctx.auth.userId,
      },
    });
  }),
});