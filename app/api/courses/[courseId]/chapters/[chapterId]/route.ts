import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const { courseId } = await params;
    const { chapterId } = await params;
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

    //TODO: handle video upload.

    return NextResponse.json(chapter, { status: 201 });
  } catch (error) {
    console.log("[COURSES_ID_CHAPTERS]", error);
    return new NextResponse("COURSES_ID_CHAPTERS", { status: 500 });
  }
}
