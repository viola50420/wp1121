import { NextResponse, type NextRequest } from "next/server";

import { and, eq } from "drizzle-orm";
import Pusher from "pusher";

import { db } from "@/db";
import {
  documentsTable,
  usersToDocumentsTable,
  messagesTable,
} from "@/db/schema";
import { auth } from "@/lib/auth";
import { privateEnv } from "@/lib/env/private";
import { publicEnv } from "@/lib/env/public";
import { updateDocSchema } from "@/validators/updateDocument";

type InsertMessageValues = {
  content: string;
  documentId: string;
  sender: string;
};

export async function POST(
  req: NextRequest,
  { params }: { params: { documentId: string } },
) {
  try {
    // 解析請求主體
    const reqBody = await req.json();

    // 取得目前登入的使用者
    const session = await auth();
    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    // 將數據插入消息表，確保包含 sender 欄位
    const insertedMessage = await db
      .insert(messagesTable)
      .values({
        content: reqBody.content,
        documentId: params.documentId,
        sender: userId, // 使用目前登入使用者的 ID 作為 sender
      })
      .returning();

    // 返回插入的消息
    return NextResponse.json(insertedMessage, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
// GET /api/documents/:documentId
export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      documentId: string;
    };
  },
) {
  try {
    // 取得來自 session 的使用者
    const session = await auth();
    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    // 取得指定 documentId 的所有消息
    const messages = await db
      .select({
        documentId: messagesTable.documentId,
        content: messagesTable.content,
      })
      .from(messagesTable)
      .where(and(eq(messagesTable.documentId, params.documentId)));
    console.log(messages);
    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
// PUT /api/documents/:documentId
export async function PUT(
  req: NextRequest,
  { params }: { params: { documentId: string } },
) {
  try {
    // Get user from session
    const session = await auth();
    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const userId = session.user.id;

    // Check ownership of document
    const [doc] = await db
      .select({
        documentId: usersToDocumentsTable.documentId,
      })
      .from(usersToDocumentsTable)
      .where(
        and(
          eq(usersToDocumentsTable.userId, userId),
          eq(usersToDocumentsTable.documentId, params.documentId),
        ),
      );
    if (!doc) {
      return NextResponse.json({ error: "Doc Not Found" }, { status: 404 });
    }

    // Parse the request body
    const reqBody = await req.json();
    let validatedReqBody: Partial<Omit<Document, "id">>;
    try {
      validatedReqBody = updateDocSchema.parse(reqBody);
    } catch (error) {
      return NextResponse.json({ error: "Bad Request" }, { status: 400 });
    }

    // Update document
    const [updatedDoc] = await db
      .update(documentsTable)
      .set(validatedReqBody)
      .where(eq(documentsTable.displayId, params.documentId))
      .returning();

    // Trigger pusher event
    const pusher = new Pusher({
      appId: privateEnv.PUSHER_ID,
      key: publicEnv.NEXT_PUBLIC_PUSHER_KEY,
      secret: privateEnv.PUSHER_SECRET,
      cluster: publicEnv.NEXT_PUBLIC_PUSHER_CLUSTER,
      useTLS: true,
    });

    // Private channels are in the format: private-...
    await pusher.trigger(`private-${updatedDoc.displayId}`, "doc:update", {
      senderId: userId,
      document: {
        id: updatedDoc.displayId,
        title: updatedDoc.title,
        content: updatedDoc.content,
      },
    });

    return NextResponse.json(
      {
        id: updatedDoc.displayId,
        title: updatedDoc.title,
        content: updatedDoc.content,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
