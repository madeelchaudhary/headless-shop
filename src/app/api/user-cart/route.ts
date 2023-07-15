import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const GET = async (req: NextRequest, res: NextResponse) => {
  const url = new URL(req.url);
  const searchParams = url.searchParams;
  const userId = searchParams.get("userId");
  if (!userId) {
    return new NextResponse("Missing user id", { status: 400 });
  }

  const updatedUserId = userId.replace(/gid:\/\/|gid:\//, "");

  try {
    const cart = await prisma.user_cart.findUnique({
      where: {
        user_id: updatedUserId,
      },
    });
    if (!cart) {
      return new NextResponse("User cart not found", { status: 404 });
    }
    return NextResponse.json({ cartId: cart.cart_id });
  } catch (e) {
    console.log(e);
    return new NextResponse("Something went wrong", { status: 500 });
  }
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const data = await req.json();
    const userId = data.userId;
    const cartId = data.cartId;

    if (!userId || !cartId) {
      return new NextResponse("Missing user id or cart id", { status: 400 });
    }

    const updatedUserId = userId.replace("gid://", "");
    await prisma.user_cart.create({
      data: {
        user_id: updatedUserId,
        cart_id: cartId,
      },
    });

    return NextResponse.json({ cartId });
  } catch (e) {
    return new NextResponse("Something went wrong", { status: 500 });
  }
};
