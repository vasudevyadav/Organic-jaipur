PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY, "orderNumber" TEXT NOT NULL, "userId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING', "paymentMethod" TEXT NOT NULL DEFAULT 'COD',
    "paymentStatus" TEXT NOT NULL DEFAULT 'PENDING', "razorpayOrderId" TEXT, "razorpayPaymentId" TEXT,
    "subtotal" REAL NOT NULL, "discount" REAL NOT NULL DEFAULT 0, "shippingFee" REAL NOT NULL DEFAULT 0,
    "total" REAL NOT NULL, "couponCode" TEXT, "customerName" TEXT NOT NULL, "customerPhone" TEXT NOT NULL,
    "customerEmail" TEXT, "addressLine1" TEXT NOT NULL, "addressLine2" TEXT, "city" TEXT NOT NULL,
    "state" TEXT NOT NULL, "pincode" TEXT NOT NULL, "notes" TEXT, "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL, CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("addressLine1","addressLine2","city","couponCode","createdAt","customerEmail","customerName","customerPhone","discount","id","notes","orderNumber","paymentMethod","pincode","shippingFee","state","status","subtotal","total","updatedAt","userId") SELECT "addressLine1","addressLine2","city","couponCode","createdAt","customerEmail","customerName","customerPhone","discount","id","notes","orderNumber","paymentMethod","pincode","shippingFee","state","status","subtotal","total","updatedAt","userId" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");
CREATE UNIQUE INDEX "Order_razorpayOrderId_key" ON "Order"("razorpayOrderId");
CREATE UNIQUE INDEX "Order_razorpayPaymentId_key" ON "Order"("razorpayPaymentId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
