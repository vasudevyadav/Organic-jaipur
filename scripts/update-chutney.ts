import { loadEnvConfig } from "@next/env";
import { PrismaClient } from "@prisma/client";
import { getDatabaseUrl } from "../src/lib/database-url";
import { CHUTNEY_DETAILS, isLaalMirchChutney } from "../src/lib/chutney";

loadEnvConfig(process.cwd());

const prisma = new PrismaClient({ datasourceUrl: getDatabaseUrl() });
async function main() {
  const products = await prisma.product.findMany({
    where: { category: "PICKLES" },
    select: { id: true, name: true },
  });
  const ids = products.filter((product) => isLaalMirchChutney(product.name)).map((product) => product.id);
  if (!ids.length) throw new Error("No matching chutney products found.");
  const result = await prisma.product.updateMany({
    where: { id: { in: ids } },
    data: CHUTNEY_DETAILS,
  });
  console.log(`Updated ${result.count} laal mirch chutney products.`);
}
main().catch(() => {
  console.error("Chutney update failed. Check database connectivity and product availability.");
  process.exitCode = 1;
}).finally(() => prisma.$disconnect());
