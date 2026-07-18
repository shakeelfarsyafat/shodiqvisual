import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Layanan videografi, fotografi, drone, post production, dan creative direction premium dari Shodiq Visual.",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
