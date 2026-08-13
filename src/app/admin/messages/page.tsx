import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default async function AdminMessagesPage() {
  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <AdminPageHeader eyebrow="Inbox" title="Messages" subtitle="Contact form submissions from customers." />

      <div className="mt-6 space-y-3">
        {submissions.length === 0 && (
          <p className="rounded-2xl border border-brand-100 bg-white p-6 text-center text-sm text-foreground/50">
            No messages yet.
          </p>
        )}
        {submissions.map((s) => (
          <div key={s.id} className="rounded-2xl border border-brand-100 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-medium text-foreground/90">
                {s.name} · {s.email}
                {s.phone ? ` · ${s.phone}` : ""}
              </span>
              <span className="text-xs text-foreground/50">{formatDate(s.createdAt)}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-foreground/70">{s.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
