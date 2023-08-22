"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchIntervalInBackground: false,
            cacheTime: 10_000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
