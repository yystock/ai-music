import prismadb from "@/lib/prismadb";

import EmailTemplate from "@/components/email";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const my_email = process.env.MY_EMAIL as string;
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  try {
    const requests = await prismadb.userRequest.findMany({
      where: {
        status: "pending",
      },
    });
    const message = `You have ${requests.length} pending requests.`;

    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [my_email],
      subject: `Pending Requests`,
      react: EmailTemplate({ message: message }),
    });

    return new Response("Successfully got CRONJOB done", { status: 200 });
  } catch (error) {
    console.log("[CRON_ROUTE_ERROR]", error);

    return new Response("Cronjob ERROR", { status: 500 });
  }
}
