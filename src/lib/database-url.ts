type DatabaseConnectionPurpose = "migration" | "runtime";

export function getDatabaseUrl(
  purpose: DatabaseConnectionPurpose = "runtime",
): string {
  const candidates =
    purpose === "migration"
      ? [
          process.env.DATABASE_URL,
          process.env.POSTGRES_URL_NON_POOLING,
          process.env.POSTGRES_URL,
          process.env.POSTGRES_PRISMA_URL,
        ]
      : [
          process.env.DATABASE_URL,
          process.env.POSTGRES_PRISMA_URL,
          process.env.POSTGRES_URL,
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
