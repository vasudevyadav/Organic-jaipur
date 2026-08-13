import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-customer";
import AccountNav from "@/components/account/AccountNav";
import AddressManager from "@/components/account/AddressManager";

export const metadata = { title: "My Addresses" };

export default async function AccountAddressesPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/account/login");

  const addresses = await prisma.address.findMany({
    where: { userId: user.id },
    orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <AccountNav name={user.name} />
      <div className="mt-8">
        <AddressManager initialAddresses={addresses} />
      </div>
    </main>
  );
}
