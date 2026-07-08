import { NextResponse } from "next/server";
import { deleteComment } from "@/lib/db";

export async function DELETE(request, { params }) {
  const password = request.headers.get("x-admin-password");
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected || password !== expected) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await params;
  await deleteComment(id);
  return NextResponse.json({ ok: true });
}
