"use client";

import { FormEvent, useState } from "react";
import { Locale } from "@/lib/i18n";

const fields = [
  ["customerName", "Customer name", "Name des Ansprechpartners"],
  ["company", "Company", "Firma"],
  ["email", "Email", "E-Mail"],
  ["phoneWhatsapp", "Phone / WhatsApp", "Telefon / WhatsApp"],
  ["country", "Country", "Land"],
  ["vehicleModel", "Vehicle model", "Fahrzeugmodell"],
  ["partName", "Part name", "Teilename"],
  ["oeNumber", "OE number if known", "OE-Nummer falls bekannt"],
  ["quantity", "Quantity", "Menge"],
  ["targetPrice", "Target price", "Zielpreis"],
] as const;

export function RfqForm({ locale }: { locale: Locale }) {
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const file = formData.get("photo");

    const response = await fetch("/api/rfq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, photoFileName: file instanceof File ? file.name : "" }),
    });

    if (response.ok) {
      form.reset();
      setMessage(locale === "de" ? "Anfrage gespeichert. Wir melden uns nach Prüfung." : "RFQ saved. We will respond after review.");
    } else {
      setMessage(locale === "de" ? "Die Anfrage konnte nicht gespeichert werden." : "The RFQ could not be saved.");
    }
    setIsSubmitting(false);
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-sm border border-[#d8d1c3] bg-[#fffdf8] p-6 shadow-sm md:grid-cols-2 md:p-8">
      {fields.map(([name, en, de]) => (
        <label key={name} className="grid gap-2 text-sm font-bold text-[#2e3438]">
          {locale === "de" ? de : en}
          <input required={["customerName", "email", "vehicleModel", "partName", "quantity"].includes(name)} name={name} className="rounded-sm border border-[#c9c0af] bg-white px-4 py-3 font-normal outline-[#c07a2c]" />
        </label>
      ))}
      <label className="grid gap-2 text-sm font-bold text-[#2e3438] md:col-span-2">
        {locale === "de" ? "Foto-Upload Platzhalter" : "Photo upload placeholder"}
        <input name="photo" type="file" accept="image/*,.pdf" className="rounded-sm border border-dashed border-[#c9c0af] bg-white px-4 py-3 font-normal" />
      </label>
      <label className="grid gap-2 text-sm font-bold text-[#2e3438] md:col-span-2">
        {locale === "de" ? "Notizen" : "Notes"}
        <textarea name="notes" rows={5} className="rounded-sm border border-[#c9c0af] bg-white px-4 py-3 font-normal outline-[#c07a2c]" />
      </label>
      <div className="flex flex-col gap-3 md:col-span-2 md:flex-row md:items-center">
        <button disabled={isSubmitting} className="rounded-sm bg-[#c07a2c] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white disabled:opacity-60">
          {isSubmitting ? (locale === "de" ? "Speichern..." : "Saving...") : locale === "de" ? "Anfrage senden" : "Submit RFQ"}
        </button>
        {message ? <p className="text-sm font-semibold text-[#2f3b2d]">{message}</p> : null}
      </div>
    </form>
  );
}
