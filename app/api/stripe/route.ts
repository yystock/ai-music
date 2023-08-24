import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const dashboardUrl = absoluteUrl("/dashboard");
const homeUrl = absoluteUrl("/");
const price_id = process.env.STRIPE_PRICE_KEY;
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const quantity = searchParams.get("q");
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!price_id) {
      return new NextResponse("Server Error", { status: 500 });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: dashboardUrl,
      cancel_url: homeUrl,

      payment_method_types: ["card"],
      mode: "payment",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price: price_id,
          quantity: quantity ? parseInt(quantity) : 1,
        },
      ],
      metadata: {
        userId,
        email: user.emailAddresses[0].emailAddress,
        quantity: quantity ? parseInt(quantity) : 1,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
