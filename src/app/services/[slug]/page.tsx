import { notFound } from "next/navigation";
import { services, portfolioItems } from "@/lib/data";
import ServiceDetailClient from "./ServiceDetailClient";

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const service = services.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  // Find related portfolio items based on the category of the service
  // Let's assume some mapping: videography -> Wedding/Commercial/Travel etc.
  // Or just pick items that have tags matching the slug.
  const relatedWorks = portfolioItems.filter(
    (item) => item.tags.includes(service.slug!) || item.category.toLowerCase().includes(service.slug!.split('-')[0])
  );

  return <ServiceDetailClient service={service} relatedWorks={relatedWorks.slice(0, 3)} />;
}
