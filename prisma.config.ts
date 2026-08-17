import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

// Mirror Next.js's env precedence: .env first, then .env.local overrides it.
loadEnv();
loadEnv({ path: ".env.local", override: true });
import { getDatabaseUrl } from "./src/lib/database-url";

const migrationUrl = getDatabaseUrl("migration");
process.env.DATABASE_URL = migrationUrl;

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  engine: "classic",
  datasource: {
    url: migrationUrl,
  },
});
