-- CreateTable
CREATE TABLE "user_cart" (
    "id" TEXT NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "cart_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "user_cart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_cart_user_id_key" ON "user_cart"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_cart_cart_id_key" ON "user_cart"("cart_id");
