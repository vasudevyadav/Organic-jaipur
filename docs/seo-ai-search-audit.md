# Organic Jaipur: SEO, AI search and content review

Reviewed: 16 September 2026. Target: https://organicjaipur.store/

## Scope and limits

The web reader retrieved the public homepage and product listing. Other requested pages, robots.txt and sitemap.xml could not be retrieved by the available network tools; those failures do not establish that the website is down or blocking crawlers. Findings below distinguish public content from repository inspection. Search Console, actual indexing, rankings, Core Web Vitals and checkout payment processing were not verified. No deployment was performed.

## Highest-priority findings

1. **Payment and delivery facts conflict (repository).** `CheckoutForm.tsx` offers Razorpay and COD, while terms, privacy, refunds and shared FAQs say COD only. Terms also say delivery is only within Jaipur, while the storefront advertises Rajasthan shipping. Confirm actual payment availability, then update all affected copy, policies, Organization schema and llms.txt together. Do not publish guessed refund rules.
2. **Product processes were incorrectly shared (repository).** Every ghee used Gir-cow source text, including buffalo ghee. Every oil used mustard and wooden-ghani text, including groundnut, coconut and stone-pressed oils. Local changes now distinguish milk sources and direct readers to the selected oil's method. Product-specific verified process records remain preferable to category templates.
3. **Claims need accessible evidence (repository/public content).** Own-farm sourcing and purity claims should link to genuine product/batch evidence. The product quality component has an “Awaiting upload” report placeholder; it is not a published certificate. Add genuine reports, applicable certification details and original process photographs when available. AI-generated farm imagery should not be presented as documentary evidence of the actual farm.
4. **Category wording is inconsistent (public listing).** Green Chilli Pickle is labelled “Lal Mirch Chutney”. The category introduction also describes chilli-garlic chutney for all pickles. Use a broader “Pickles & Chutneys” category with product-specific descriptions. Some names already contain the size and the adjacent size field repeats it in extracted text (for example 500 g 500 g); simplify the display while preserving a clear pack-size field.

## Technical findings and local fixes

- Sitemap excluded out-of-stock items even though their product pages remain available. Removed the stock filter so temporarily unavailable products remain discoverable.
- Sitemap lacked an explicit refresh interval. Added hourly revalidation so database changes and a temporary fallback do not require another deployment to refresh the sitemap.
- FAQ answers already existed in the rendered markup; they were not missing from SEO content. However, opening collapsed answers required JavaScript. Replaced custom button/state interaction with native details/summary elements, keeping all answers in HTML and providing keyboard and no-JavaScript interaction. Each accordion has its own native exclusive group.
- Canonicals, Product/Offer schema, Organization schema, breadcrumbs and FAQ schema are already implemented. Their presence does not prove indexing or rich-result eligibility.
- Category filters currently canonicalize to `/products`. If category-specific search landing pages are a business priority, create genuinely useful category pages with their own copy, titles and self-canonicals; avoid indexing every sort/price combination.
- Several pages inherit homepage Open Graph values from the root layout. Give shareable landing pages their own title, description and URL.
- Rajasthan city pages largely reuse one template and general city blurbs. Add verified service details, delivery estimates, charges and useful local answers where available instead of creating more near-identical pages.

## AI search and content priorities

Use consistent product names, prices, stock, ingredients, net quantity, storage information and delivery facts across visible copy and structured data. Keep useful answers in readable HTML and cite real supporting evidence. Write clear product/category headings alongside the brand's Hinglish slogans.

Google says no special AI schema or AI text file is necessary for AI Overviews/AI Mode. `llms.txt` is not a Google ranking fix. FAQ content can help customers, but Google generally restricts FAQ rich results to authoritative government and health sites; an ecommerce FAQ should not be sold as a guaranteed rich-result feature.

Sources:
- https://organicjaipur.store/
- https://organicjaipur.store/products
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/blog/2023/08/howto-faq-changes

## Validation and next verification

TypeScript and targeted ESLint passed for the initial local changes. Existing uncommitted edits in the product-detail and Jaipur-locality pages were preserved. Before publishing, visually check the accordion on mobile/desktop and verify the deployed sitemap, representative product structured data, and URL indexing in Search Console. Measure Core Web Vitals before making performance claims.

## Implementation follow-up

The requested code fixes now align payment and delivery wording in the policies, shared FAQs, Organization schema and llms.txt. Shipping-policy text uses the same pricing thresholds as checkout. Pickles and chutneys share an accurate category label, product cards avoid repeated pack sizes, and ghee process text distinguishes buffalo and cow sources. The generic oil guide no longer describes every oil as wooden-ghani mustard oil.

The certificate-shaped placeholder has been removed. Product pages explicitly state that no report is published and invite a batch-availability enquiry without promising that a certificate exists. Quality panels are all included in initial HTML. Process imagery is described as illustrative.

Canonical storefront pages have page-specific Open Graph/Twitter metadata. Existing category landing URLs have category-specific titles, descriptions and self-canonicals, with sort/price variations consolidated to the category URL. Category URLs are included in the refreshing sitemap.

Real certificates, source records and original farm photographs still require business-supplied evidence. City-specific delivery facts and indexing/performance metrics cannot be fabricated from code. No deployment or payment transaction was performed.

Validation: production build completed successfully and generated 89 pages after network access was allowed for Google Fonts. Targeted lint has no errors; existing Next.js raw-image warnings remain. Server-render checks verified native FAQ markup, all quality panels in HTML, buffalo-specific process text and the report-availability notice. Pack-size matching checks include embedded units, decimals and numeric boundaries. Final copy updates include policy revision dates and removing a stale maximum pack-size claim.

## Accordion browser verification

Browser regression checks on the local site covered About, Contact, all four policy pages and a buffalo-ghee product page. Fixed missing arrow/Home/End keyboard support and roving focus in product tabs, scoped tab/panel IDs per component instance, and made all quality sections readable without JavaScript. Fixed the narrow process layout at 320px/375px and About team content being initially transparent without JavaScript. Subpage FAQs now emit matching FAQ structured data and avoid unrelated fallback FAQs on unmapped routes.

All browser checks passed, including click/Enter/Space FAQ controls, exclusive expansion, matching visible FAQ/schema text, tab focus/ARIA, mobile overflow, and JavaScript-disabled content. No browser runtime or hydration errors occurred. Mobile screenshots were inspected. Run again with the app running: `npm run test:accordions` (defaults to http://localhost:3000; override with BASE_URL). The checks only read pages and interact with accordions/tabs; they do not submit orders or forms.
