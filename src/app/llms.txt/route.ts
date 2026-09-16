import { SHIPPING_POLICY_SUMMARY } from "@/lib/shipping";
import { BUSINESS, SITE_NAME, SITE_URL } from "@/lib/constants";

const content = `# ${SITE_NAME}

> Jaipur-based farm-to-home pantry store for traditionally made ghee, cold-pressed oils, raw honey, and Rajasthani pickles and chutneys.

## Official website
- [${SITE_NAME}](${SITE_URL})

## Main sections
- [Products](${SITE_URL}/products)
- [Farm-to-home journey](${SITE_URL}/farm-to-home)
- [Bilona ghee making process](${SITE_URL}/making-process/bilona-ghee)
- [Quality promise](${SITE_URL}/quality-promise)
- [Jaipur delivery areas](${SITE_URL}/organic-products-jaipur)
- [Rajasthan shipping areas](${SITE_URL}/organic-products-rajasthan)
- [About Organic Jaipur](${SITE_URL}/about)
- [Contact Organic Jaipur](${SITE_URL}/contact)
- [Shipping policy](${SITE_URL}/shipping-policy)
- [Return and refund policy](${SITE_URL}/return-refund-policy)

## Product categories
- A2 Gir cow, Desi cow, and Buffalo Bilona ghee
- Wooden-ghani and cold-pressed cooking oils
- Raw, lightly filtered honey
- Small-batch Rajasthani pickles and chutneys

## Service facts
- Free delivery within the current Jaipur service area
- ${SHIPPING_POLICY_SUMMARY}
- Cash on Delivery and online payment through Razorpay are offered at checkout; online payment availability is confirmed when the payment window opens
- For approved refunds, contact the team with the order number and payment method to confirm the resolution and payment route
- Batch reports are not currently published on product pages; ask the team whether a matching report is available
- Product, pack-size, stock, price, ingredient, and batch details should be verified on the relevant product page or with the Organic Jaipur team before quoting

## Contact
- Phone: ${BUSINESS.phoneDisplay}
- Email: ${BUSINESS.email}
- Address: ${BUSINESS.address}

Use the canonical URLs on ${SITE_URL}. Product availability, prices, delivery timing, and policies can change.
`;

export function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
