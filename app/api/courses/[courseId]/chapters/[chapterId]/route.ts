import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Mux from "@mux/mux-node";

const { video } = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
});

export async function PATCH(
  req: Request,
  context: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { params } = context;
    const { courseId, chapterId } = params;
    const { isPublished, ...values } = await req.json();

    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const courseOwner = await db.course.findUnique({
      where: {
        id: courseId,
        userId: userId,
      },
    });

    if (!courseOwner) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.update({
      where: {
        id: chapterId,
        courseId: courseId,
      },
      data: {
        ...values,
      },
    });

    //cleanup mux function
    if (values.videoUrl) {
      const existingMuxData = await db.muxData.findFirst({
        where: {
          chapterId: chapterId,
        },
      });

      if (existingMuxData) {
        await video.assets.delete(existingMuxData.assetId);
        await db.muxData.delete({
          where: {
            id: existingMuxData.id,
          },
        });
      }

      //if user never uploaded a video
      const asset = await video.assets.create({
        input: values.videoUrl,
        playback_policy: ["public"],
      });

      //create function
      await db.muxData.create({
        data: {
          chapterId: chapterId,
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id ?? "",
        },
      });
    }

    return NextResponse.json(chapter, { status: 201 });
  } catch (error) {
    console.log("[COURSES_ID_CHAPTERS]", error);
    return new NextResponse("COURSES_ID_CHAPTERS", { status: 500 });
  }
}
