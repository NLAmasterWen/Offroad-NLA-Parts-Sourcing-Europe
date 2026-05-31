import { NextResponse } from "next/server";
import { createRfq, RfqInput } from "@/lib/rfq";

export const runtime = "nodejs";

type RfqPayload = Partial<RfqInput>;

const fields: (keyof RfqInput)[] = [
  "customerName",
  "company",
  "email",
  "phoneWhatsapp",
  "country",
  "vehicleModel",
  "partName",
  "oeNumber",
  "quantity",
  "targetPrice",
  "photoFileName",
  "notes",
];

export async function POST(request: Request) {
  const payload = (await request.json()) as RfqPayload;
  const required = ["customerName", "email", "vehicleModel", "partName", "quantity"] as const;
  const missing = required.filter((field) => !payload[field]?.trim());

  if (missing.length > 0) {
    return NextResponse.json({ error: "Missing required fields", missing }, { status: 400 });
  }

  const input = fields.reduce((accumulator, field) => {
    accumulator[field] = String(payload[field] ?? "").trim();
    return accumulator;
  }, {} as RfqInput);

  const rfq = await createRfq(input);
  return NextResponse.json({ rfq }, { status: 201 });
}
