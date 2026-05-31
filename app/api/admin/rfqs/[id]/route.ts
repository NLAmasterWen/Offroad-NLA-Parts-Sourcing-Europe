import { NextResponse } from "next/server";
import { hasAdminAccess, statuses, updateRfqStatus } from "@/lib/rfq";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!hasAdminAccess(request.headers.get("x-admin-password"))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const payload = (await request.json()) as { status?: string };
  if (!payload.status || !statuses.includes(payload.status as (typeof statuses)[number])) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const rfq = await updateRfqStatus(id, payload.status as (typeof statuses)[number]);
  if (!rfq) {
    return NextResponse.json({ error: "RFQ not found" }, { status: 404 });
  }

  return NextResponse.json({ rfq });
}
