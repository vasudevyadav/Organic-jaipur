# Organic Jaipur

A full-stack Next.js (App Router + TypeScript + Tailwind CSS) website for Organic Jaipur, an organic
grocery store in Jaipur selling vegetables, fruits, ghee, mustard oil, and honey.

## Stack

- **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS v4**
- **Prisma** + **SQLite** for data storage
- **Framer Motion** for scroll/hover animations
- Cookie-based password protection (via `proxy.ts`, Next's middleware convention) for `/admin`

## Getting Started

```bash
npm install
cp .env.example .env   # then edit ADMIN_PASSWORD if desired
npx prisma migrate dev
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Environment variables

| Variable         | Description                                   |
| ---------------- | ---------------------------------------------- |
| `DATABASE_URL`   | SQLite connection string (default `file:./dev.db`) |
| `ADMIN_PASSWORD` | Password required to log into `/admin`         |

### Admin panel

Visit [http://localhost:3000/admin/login](http://localhost:3000/admin/login) and sign in with the
`ADMIN_PASSWORD` from your `.env` file to add, edit, or delete products and view contact form
submissions.

### Data model

- `Product` — id, name, slug, category, price, unit, description, imageUrl, inStock, featured
- `ContactSubmission` — id, name, email, phone, message, createdAt

### API routes

- `GET /api/products` — list products (`?category=` filter)
- `POST /api/products` — create product (admin only)
- `GET /api/products/:id` — get a single product
- `PATCH /api/products/:id` — update a product (admin only)
- `DELETE /api/products/:id` — delete a product (admin only)
- `POST /api/contact` — submit the contact form
- `GET /api/contact` — list contact submissions (admin only)

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npm run db:seed` — seed the database with placeholder products
