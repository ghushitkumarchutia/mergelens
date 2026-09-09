import { requireAuth } from "@/features/auth/actions";
import type { ReactNode } from "react";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAuth();

  return (
    <div className='min-h-svh w-full bg-ml-bg text-ml-text'>{children}</div>
  );
}
