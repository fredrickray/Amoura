import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SupportThread } from "@/components/account/SupportThread";
import { getSupportTicket, supportTickets } from "@/data/account";

export function generateStaticParams() {
  return supportTickets.map((t) => ({ id: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const ticket = getSupportTicket(id);
  return { title: ticket ? ticket.subject : "Support" };
}

export default async function SupportThreadPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ticket = getSupportTicket(id);
  if (!ticket) notFound();
  return <SupportThread ticket={ticket} />;
}
