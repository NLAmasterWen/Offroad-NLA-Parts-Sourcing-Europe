import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export const statuses = ["new", "reviewing", "quoted", "won", "lost"] as const;

export type RfqStatus = (typeof statuses)[number];

export type RfqSubmission = {
  id: string;
  createdAt: string;
  status: RfqStatus;
  customerName: string;
  company: string;
  email: string;
  phoneWhatsapp: string;
  country: string;
  vehicleModel: string;
  partName: string;
  oeNumber: string;
  quantity: string;
  targetPrice: string;
  photoFileName: string;
  notes: string;
};

export type RfqInput = Omit<RfqSubmission, "id" | "createdAt" | "status">;

function storagePath() {
  return path.resolve(process.cwd(), process.env.RFQ_STORAGE_PATH ?? ".rfq-data/rfqs.json");
}

async function ensureStorage() {
  const filePath = storagePath();
  await mkdir(path.dirname(filePath), { recursive: true });
  return filePath;
}

export async function readRfqs(): Promise<RfqSubmission[]> {
  const filePath = await ensureStorage();
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw) as RfqSubmission[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      await writeFile(filePath, "[]\n", "utf8");
      return [];
    }
    throw error;
  }
}

export async function createRfq(input: RfqInput) {
  const rfqs = await readRfqs();
  const submission: RfqSubmission = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
    ...input,
  };
  rfqs.unshift(submission);
  await writeRfqs(rfqs);
  return submission;
}

export async function updateRfqStatus(id: string, status: RfqStatus) {
  const rfqs = await readRfqs();
  const next = rfqs.map((rfq) => (rfq.id === id ? { ...rfq, status } : rfq));
  await writeRfqs(next);
  return next.find((rfq) => rfq.id === id) ?? null;
}

async function writeRfqs(rfqs: RfqSubmission[]) {
  const filePath = await ensureStorage();
  await writeFile(filePath, `${JSON.stringify(rfqs, null, 2)}\n`, "utf8");
}

export function hasAdminAccess(password: string | null) {
  const configuredPassword = process.env.ADMIN_PASSWORD;
  return Boolean(configuredPassword) && password === configuredPassword;
}
