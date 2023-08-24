import EmailTemplate from "@/components/email";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { inquirySchema } from "@/lib/type";

const resend = new Resend(process.env.RESEND_API_KEY);
const my_email = process.env.MY_EMAIL as string;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, message } = inquirySchema.parse(body);
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [my_email],
      subject: `Inquiry from ${email}`,
      react: EmailTemplate({ message: message }),
    });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
