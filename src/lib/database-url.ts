type DatabaseConnectionPurpose = "migration" | "runtime";

export function getDatabaseUrl(
  purpose: DatabaseConnectionPurpose = "runtime",
): string {
  const candidates =
    purpose === "migration"
      ? [
          // Migrations need a direct (non-pooled) connection: advisory locks
          // don't work reliably through a PgBouncer-style pooler.
          process.env.DATABASE_URL_UNPOOLED,
          process.env.POSTGRES_URL_NON_POOLING,
          process.env.DATABASE_URL,
          process.env.POSTGRES_URL,
          process.env.POSTGRES_PRISMA_URL,
        ]
      : [
          process.env.DATABASE_URL,
          process.env.POSTGRES_PRISMA_URL,
          process.env.POSTGRES_URL,
          process.env.DATABASE_URL_UNPOOLED,
          process.env.POSTGRES_URL_NON_POOLING,
        ];

  const url = candidates.find((candidate) => candidate?.trim());

  if (!url) {
    throw new Error(
      "Database connection is missing. Configure DATABASE_URL (recommended) or a Vercel Postgres URL environment variable.",
    );
  }

  return url;
}
