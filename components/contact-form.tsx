"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { inquirySchema } from "@/lib/type";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useContactModal } from "@/hooks/useContactModal";
export function ContactForm() {
  const contactModal = useContactModal();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof inquirySchema>>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      email: "",
      message: "Something is wrong with my order",
    },
  });

  async function onSubmit(values: z.infer<typeof inquirySchema>) {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/send", values);
      toast.success("Message sent");
      contactModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    }
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Input placeholder="Message: Some thing is wrong with my order" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
