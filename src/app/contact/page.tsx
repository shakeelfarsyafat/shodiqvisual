import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Hubungi Shodiq Visual untuk mendiskusikan project videografi dan fotografi Anda. WhatsApp, email, atau form kontak tersedia.",
};

export default function ContactPage() {
  return <ContactClient />;
}
