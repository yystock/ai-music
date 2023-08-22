import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const dashboardUrl = absoluteUrl("/dashboard");
const homeUrl = absoluteUrl("/");
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const quantity = searchParams.get("q");
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const prices = await stripe.prices.list({
      lookup_keys: ["credits"],
    });
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: dashboardUrl,
      cancel_url: homeUrl,

      payment_method_types: ["card"],
      mode: "payment",
      billing_address_collection: "auto",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price: prices.data[0].id,
          quantity: quantity ? parseInt(quantity) : 1,
        },
      ],
      metadata: {
        userId,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  } catch (error) {
    console.log("[STRIPE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
