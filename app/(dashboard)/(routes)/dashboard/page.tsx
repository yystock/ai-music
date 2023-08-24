import { columns } from "./columns";
import { DataTable } from "./data-table";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MusiCat | Dashboard",
  description: "Your Personalized AI Music Journey",
};
export default async function DashboardPage() {
  const { userId } = auth();
  if (!userId) redirect("/login");
  const data = await prismadb.userRequest.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">Explore the power of AI</h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">Chat with the smartest AI - Experience the power of AI</p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
