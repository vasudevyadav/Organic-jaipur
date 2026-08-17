ALTER TABLE "Product" ADD COLUMN "weight" INTEGER NOT NULL DEFAULT 0;

UPDATE "Product"
SET "weight" = CASE
  WHEN lower("unit") ~ '^[0-9.]+\\s*kg' THEN round(substring(lower("unit") from '^[0-9.]+')::numeric * 1000)::integer
  WHEN lower("unit") ~ '^[0-9.]+\\s*(g|gm)' THEN round(substring(lower("unit") from '^[0-9.]+')::numeric)::integer
  WHEN lower("unit") ~ '^[0-9.]+\\s*l' THEN round(substring(lower("unit") from '^[0-9.]+')::numeric * 1000)::integer
  WHEN lower("unit") ~ '^[0-9.]+\\s*ml' THEN round(substring(lower("unit") from '^[0-9.]+')::numeric)::integer
  ELSE 0
END;

ALTER TABLE "OrderItem" ADD COLUMN "weight" INTEGER NOT NULL DEFAULT 0;
