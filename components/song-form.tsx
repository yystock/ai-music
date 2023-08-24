"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { Input } from "./ui/input";
import SongSerach from "./song-search";
import { X } from "lucide-react";
import { useStripeModal } from "@/hooks/useStripeModal";
import { formSchema } from "@/lib/type";

export function SongForm() {
  // 1. Define your form.
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const stripeModal = useStripeModal();

  const { mutate: makeRequest, isLoading } = useMutation({
    mutationFn: async (newRequest: z.infer<typeof formSchema>) => {
      let api = "/api/song";
      if (newRequest.task === "Music Generation") {
        api = "/api/music";
      }
      const { data } = await axios.post(api, newRequest);
      return data;
    },
    onError: (err: any) => {
      if (err?.response?.status === 401) {
        toast.error("Unauthorized");
      } else if (err?.response?.status === 403) {
        toast.error("Not enough credits");
        stripeModal.onOpen();
      } else if (err?.response?.status === 500) {
        toast.error("Server Error");
        router.push("/dashboard");
      } else if (err?.response?.status === 400) {
        toast.error("Request Error");
      } else {
        toast.error("Error");
        router.push("/dashboard");
      }
    },
    onSuccess: (data) => {
      router.push(`/yours/${data.id}`);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      source: "AI",
      request: "Please give me a list of songs similar to the selected below.",
      songs: [],
      task: "Song Recommendations",
      to: "Web",
      email: "",
    },
  });
  const watch = form.watch("to");
  const watchSongs = form.watch("songs");
  const task = form.watch("task");

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (isSignedIn === false) {
      router.push("/sign-in");
      return;
    }
    if (values.to === "Email") {
      toast.success("Request Sent");
      toast.success("The results will be sent to the email address within 24 hours.");
    }
    if (values.to === "Web") {
      toast.success("Request Sent");
      toast.success("You will be redirected shortly.");
    }
    makeRequest(values);
  }
  // ...

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col space-y-8 w-1/2 px-12 py-16 shadow-lg backdrop-blur-3xl backdrop-filter rounded-2xl bg-white/10")}
      >
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem className="w-36">
                <FormLabel></FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={"AI"} placeholder="AI" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="AI">AI</SelectItem>
                    <SelectItem value="Fantano">Fantano</SelectItem>
                    <SelectItem value="M1">Music Critics 1</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="task"
            render={({ field }) => (
              <FormItem className="w-52">
                <FormLabel></FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={"Song Recommendations"} placeholder="Song Recommendations" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Music Generation">Music Generation</SelectItem>
                    <SelectItem value="Song Recommendations">Song Recommendations</SelectItem>
                    <SelectItem value="Similar Songs">Similar Songs</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <span className="flex-grow"></span>
          <FormField
            control={form.control}
            name="to"
            render={({ field }) => (
              <FormItem className="w-28 flex items-center gap-3 justify-center">
                <FormLabel>To:</FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue defaultValue={"Web"} placeholder="Web" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Web">Web</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {watch === "Email" && (
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <SongSerach getValues={form.getValues("songs")} handleSelect={(song) => form.setValue("songs", song)} />
        <FormField
          control={form.control}
          name="request"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl>
                <Textarea
                  placeholder={
                    task === "Music Generation"
                      ? "Please generate some music similar to:"
                      : "Please give me a list of songs similar to the selected below:"
                  }
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {watchSongs?.length > 0 && (
          <div>
            {watchSongs.map((song) => (
              <div key={song.name} className=" my-1 px-4 py-1 flex bg-white/10  backdrop-blur-lg shadow-lg rounded-2xl">
                <p className="text-green-500">{song.name}</p>
                <p className="ml-2">- {song.artist}</p>
                <span className="flex-grow"></span>
                <X
                  className="hover:cursor-pointer fill-destructive"
                  onClick={() => form.setValue("songs", [...form.getValues("songs").filter((item) => item.name !== song.name)])}
                />
              </div>
            ))}
          </div>
        )}
        <div className="relative group justify-self-center">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <Button
            type="submit"
            className={cn("relative w-full bg-slate-100 dark:bg-black text-foreground hover:bg-slate-100/80 hover:dark:bg-black/80")}
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
