import { notFound } from "next/navigation";
import { portfolioItems } from "@/lib/data";
import PortfolioDetailClient from "./PortfolioDetailClient";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = portfolioItems.find((p) => p.slug === slug);
  if (!item) return {};

  return {
    title: `${item.title} — ${item.subtitle}`,
    description: item.description,
  };
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = portfolioItems.find((p) => p.slug === slug);

  if (!item) notFound();

  const related = portfolioItems
    .filter((p) => p.category === item.category && p.id !== item.id)
    .slice(0, 3);

  return <PortfolioDetailClient item={item} related={related} />;
}
