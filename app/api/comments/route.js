import { NextResponse } from "next/server";
import { listComments, addComment } from "@/lib/db";

const MAX_NAME_LENGTH = 80;
const MAX_MESSAGE_LENGTH = 2000;

export async function GET() {
  const comments = await listComments();
  return NextResponse.json({ comments });
}

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const name = body?.name?.trim();
  const message = body?.message?.trim();

  if (!name || !message) {
    return NextResponse.json(
      { error: "Name and message are required." },
      { status: 400 }
    );
  }
  if (name.length > MAX_NAME_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: "Text is too long." }, { status: 400 });
  }

  const comment = await addComment(name, message);
  return NextResponse.json({ comment }, { status: 201 });
}
