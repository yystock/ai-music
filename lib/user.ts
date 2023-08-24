import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export const getUser = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const user = await prismadb.user.findUnique({
    where: {
      userId: userId,
    },
    select: {
      role: true,
      credits: true,
    },
  });

  if (!user) {
    return false;
  }

  return user;
};
