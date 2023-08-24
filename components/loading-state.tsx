"use client";
import { useEffect, useState } from "react";
import { statusSchema } from "@/lib/type";
import { z } from "zod";
import axios from "axios";
import { UserRequest } from "@prisma/client";
interface LoadingStateProps {
  id: string;
  data: UserRequest;
}

type Status = z.infer<typeof statusSchema>;
export default function LoadingState({ id }: LoadingStateProps) {
  const [responseStatus, setResponseStatus] = useState<Status>("pending");
  const pollingInterval = 2000; // 2 seconds

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/status");

      setResponseStatus(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, pollingInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (responseStatus === "pending") {
    return <div>pending</div>;
  }
  if (responseStatus === "failed") {
    return <div>error</div>;
  }
  return (
    <div>
      <p>Response Status: {responseStatus}</p>
    </div>
  );
}
