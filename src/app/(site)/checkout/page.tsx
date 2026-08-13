import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth-customer";
import CheckoutForm from "@/components/CheckoutForm";

export const metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage() {
  const user = await getCurrentUser();
  const addresses = user
    ? await prisma.address.findMany({
        where: { userId: user.id },
        orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
      })
    : [];

  return (
    <CheckoutForm
      user={user ? { name: user.name, email: user.email, phone: user.phone } : null}
      addresses={addresses}
    />
  );
}
