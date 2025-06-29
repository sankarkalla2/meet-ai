import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/trpc/init";

import { z } from "zod";
import { and, count, desc, eq, ilike } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { streamVideo } from "@/lib/stream-video";

export const meetingsRouter = createTRPCRouter({
  generateToke: protectedProcedure.mutation(async ({ ctx }) => {
    await streamVideo.upsertUsers([
      {
        id: ctx.auth.user.id,
        name: ctx.auth.user.name,
        image: ctx.auth.user.image || "https://github.com/shadcn.png",
        role: "admin",
      },
    ]);

    const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;
    const issuedAt = Math.floor(Date.now() / 1000) - 60;

    const token = streamVideo.generateUserToken({
      user_id: ctx.auth.user.id,
      exp: expirationTime,
      validity_in_seconds: issuedAt,
    });

    return token;
  }),
  getOne: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const [existingMeeting] = await db
        .select()
        .from(meetings)
        .where(eq(meetings.id, input.id));

      if (!existingMeeting) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Meeting not found",
        });
      }

      return existingMeeting;
    }),
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(1),
        pageSize: z.number().min(1).max(100).default(10),
        search: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await db
        .select()
        .from(meetings)
        .where(
          and(
            eq(meetings.userId, ctx.auth.user.id),
            input?.search
              ? ilike(meetings.name, `%${input.search}%`)
              : undefined
          )
        )
        .orderBy(desc(meetings.createdAt), desc(agents.id))
        .limit(10)
        .offset((input.page - 1) * input.pageSize * 10);

      const [total] = await db
        .select({ count: count() })
        .from(agents)
        .where(
          and(
            eq(meetings.userId, ctx.auth.user.id),
            input.search ? ilike(meetings.name, `%${input.search}%`) : undefined
          )
        );

      const totalPages = Math.ceil(total.count / input.pageSize);
      return {
        items: data,
        total: total.count,
        totalPages: totalPages,
      };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string(), agentId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const [createdMeeting] = await db
        .insert(meetings)
        .values({
          ...input,
          userId: ctx.auth.user.id,
        })
        .returning();

      const call = streamVideo.video.call("default", createdMeeting.id);
      await call.create({
        data: {
          created_by_id: ctx.auth.user.id,
          custom: {
            meetingId: createdMeeting.id,
            meetingName: createdMeeting.name,
          },
          settings_override: {
            transcription: {
              language: "en",
              mode: "auto-on",
              closed_caption_mode: "auto-on",
            },
            recording: {
              mode: "auto-on",
              quality: "1080p",
            },
          },
        },
      });

      const [existingAgent] = await db
        .select()
        .from(agents)
        .where(eq(agents.id, createdMeeting.agentId));

      if (!existingAgent)
        throw new TRPCError({ code: "NOT_FOUND", message: "agent not found" });

      await streamVideo.upsertUsers([
        {
          id: existingAgent.id,
          name: existingAgent.name,
          role: 'user',
          image: 'https://github.com/shadcn.png'

        },
      ]);
      return createdMeeting;
    }),
});
