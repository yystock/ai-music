import { columns } from "./columns";
import { DataTable } from "./data-table";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import type { Metadata } from "next";
import { Heading } from "@/components/heading";

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
        <Heading title="Dashboard" description="Order History" name="layout-dashboard" />
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        <div className="container mx-auto py-10">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
