import React from "react";
import { requireUnauth } from "@/features/auth/actions";

export interface AuthLayoutProps {
  readonly children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  await requireUnauth();
  return (
    <div className='relative flex min-h-svh w-full flex-1 flex-col items-center justify-center bg-ml-bg-raised text-ml-text font-manrope px-4 py-8 md:py-16'>
      <div className='w-full max-w-97.5 md:max-w-100 z-10'>{children}</div>
    </div>
  );
}
