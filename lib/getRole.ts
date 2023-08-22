import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export const checkUser = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const user = await prismadb.user.findUnique({
    where: {
      userId: userId,
    },
  });

  if (!user) {
    return false;
  }

  return user.role;
};
