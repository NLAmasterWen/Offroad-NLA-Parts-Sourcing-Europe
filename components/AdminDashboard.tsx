"use client";

import { FormEvent, useState } from "react";
import { RfqSubmission, statuses } from "@/lib/rfq";

export function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [rfqs, setRfqs] = useState<RfqSubmission[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAuthed, setIsAuthed] = useState(false);

  async function loadRfqs(event?: FormEvent) {
    event?.preventDefault();
    const response = await fetch("/api/admin/rfqs", { headers: { "x-admin-password": password } });
    if (!response.ok) {
      setError("Invalid password or admin password is not configured.");
      setIsAuthed(false);
      return;
    }
    const data = (await response.json()) as { rfqs: RfqSubmission[] };
    setRfqs(data.rfqs);
    setError(null);
    setIsAuthed(true);
  }

  async function updateStatus(id: string, status: string) {
    const response = await fetch(`/api/admin/rfqs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-admin-password": password },
      body: JSON.stringify({ status }),
    });
    if (response.ok) {
      const data = (await response.json()) as { rfq: RfqSubmission };
      setRfqs((current) => current.map((rfq) => (rfq.id === id ? data.rfq : rfq)));
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f3ee] px-5 py-10 text-[#171915]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 border-b border-[#d8d1c3] pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#c07a2c]">RFQ Admin</p>
            <h1 className="mt-3 text-4xl font-black">Local RFQ submissions</h1>
            <p className="mt-3 max-w-2xl text-[#666a60]">Protected by ADMIN_PASSWORD from .env. Submissions are read from local JSON storage.</p>
          </div>
          <form onSubmit={loadRfqs} className="flex gap-2">
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Admin password" className="rounded-sm border border-[#c9c0af] bg-white px-4 py-3" />
            <button className="rounded-sm bg-[#2f3b2d] px-5 py-3 font-bold text-white">Unlock</button>
          </form>
        </div>
        {error ? <p className="mt-6 rounded-sm border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p> : null}
        {isAuthed ? (
          <div className="mt-8 overflow-x-auto rounded-sm border border-[#d8d1c3] bg-[#fffdf8] shadow-sm">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead className="bg-[#2e3438] text-white">
                <tr>
                  <th className="p-4">Created</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Vehicle / Part</th>
                  <th className="p-4">Commercials</th>
                  <th className="p-4">Notes</th>
                </tr>
              </thead>
              <tbody>
                {rfqs.map((rfq) => (
                  <tr key={rfq.id} className="border-t border-[#d8d1c3] align-top">
                    <td className="p-4 whitespace-nowrap">{new Date(rfq.createdAt).toLocaleString()}</td>
                    <td className="p-4">
                      <select value={rfq.status} onChange={(event) => updateStatus(rfq.id, event.target.value)} className="rounded-sm border border-[#c9c0af] bg-white px-3 py-2 font-semibold">
                        {statuses.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4">
                      <p className="font-bold">{rfq.customerName}</p>
                      <p>{rfq.company}</p>
                      <p>{rfq.email}</p>
                      <p>{rfq.phoneWhatsapp}</p>
                      <p>{rfq.country}</p>
                    </td>
                    <td className="p-4">
                      <p className="font-bold">{rfq.vehicleModel}</p>
                      <p>{rfq.partName}</p>
                      <p>OE: {rfq.oeNumber || "—"}</p>
                      <p>Photo: {rfq.photoFileName || "—"}</p>
                    </td>
                    <td className="p-4">
                      <p>Qty: {rfq.quantity}</p>
                      <p>Target: {rfq.targetPrice || "—"}</p>
                    </td>
                    <td className="max-w-sm p-4">{rfq.notes || "—"}</td>
                  </tr>
                ))}
                {rfqs.length === 0 ? (
                  <tr><td colSpan={6} className="p-8 text-center text-[#666a60]">No RFQs yet.</td></tr>
                ) : null}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>
    </div>
  );
}
