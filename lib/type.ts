import * as z from "zod";

export const formSchema = z
  .object({
    source: z.enum(["AI", "Fantano", "M1"]),
    task: z.enum(["Music Generation", "Song Recommendations", "Similar Songs"]),
    songs: z.array(z.object({ id: z.string(), name: z.string(), artist: z.string() })),
    to: z.enum(["Web", "Email"]),
    email: z.string().email().or(z.literal("")),
    request: z.string().min(2, {
      message: "Request must be at least 2 characters.",
    }),
  })
  .superRefine((val, ctx) => {
    if (val.to === "Email" && val.email === "") {
      ctx.addIssue({ message: "Please Enter a valid Email Address.", code: z.ZodIssueCode.custom, path: ["email"] });
    }
  });

export const statusSchema = z.enum(["pending", "succeed", "failed"]);

export const inquirySchema = z.object({
  email: z.string().email().or(z.literal("")),
  message: z.string().min(2, {
    message: "Request must be at least 2 characters.",
  }),
});
