import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Kenali Shodiq Visual — studio videografi dan fotografi premium dengan 6+ tahun pengalaman mengabadikan cerita-cerita yang bermakna.",
};

export default function AboutPage() {
  return <AboutClient />;
}
