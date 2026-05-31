import { NextResponse } from "next/server";
import { hasAdminAccess, readRfqs } from "@/lib/rfq";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!hasAdminAccess(request.headers.get("x-admin-password"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rfqs = await readRfqs();
  return NextResponse.json({ rfqs });
}
