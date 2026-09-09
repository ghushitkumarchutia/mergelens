import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { Skeleton } from "@/components/ui/skeleton";

export default function SettingsLoading() {
  return (
    <>
      <DashboardHeader
        title='Settings'
        description='Manage your profile and subscription.'
      />

      <div className='flex flex-1 flex-col p-4 sm:p-6 md:p-8 w-full max-w-3xl space-y-6 select-none'>
        <div className='h-10 border-b border-ml-border flex items-center gap-6'>
          <div className='h-full border-b-2 border-ml-text flex items-center px-2'>
            <Skeleton className='h-4 w-14 rounded-none bg-ml-surface-2' />
          </div>
          <div className='h-full flex items-center px-2'>
            <Skeleton className='h-4 w-36 rounded-none bg-ml-surface-2/60' />
          </div>
        </div>

        <div className='border border-ml-border bg-ml-surface rounded-none overflow-hidden'>
          <div className='p-5 sm:p-6 border-b border-ml-border space-y-2'>
            <Skeleton className='h-5 w-36 rounded-none bg-ml-surface-2' />
            <Skeleton className='h-3.5 w-72 rounded-none bg-ml-surface-2/70' />
          </div>

          <div className='p-5 sm:p-6 space-y-6'>
            <div className='flex items-center gap-4.5 p-4 border border-ml-border bg-ml-bg/60'>
              <Skeleton className='size-16 rounded-none shrink-0 bg-ml-surface-2 border border-ml-border' />
              <div className='min-w-0 flex-1 space-y-2'>
                <div className='flex items-center gap-2.5'>
                  <Skeleton className='h-4.5 w-36 rounded-none bg-ml-surface-2' />
                  <Skeleton className='h-4 w-24 rounded-none bg-ml-surface-2/60' />
                </div>
                <Skeleton className='h-3.5 w-48 rounded-none bg-ml-surface-2/70' />
                <Skeleton className='h-3 w-32 rounded-none bg-ml-surface-2/50' />
              </div>
            </div>

            <div className='h-px bg-ml-border w-full' />

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
              <div className='space-y-2'>
                <Skeleton className='h-3 w-20 rounded-none bg-ml-surface-2/70' />
                <Skeleton className='h-10 w-full rounded-none bg-ml-bg border border-ml-border' />
              </div>
              <div className='space-y-2'>
                <Skeleton className='h-3 w-24 rounded-none bg-ml-surface-2/70' />
                <Skeleton className='h-10 w-full rounded-none bg-ml-bg border border-ml-border' />
              </div>
            </div>
          </div>

          <div className='border-t border-ml-border bg-ml-bg/40 p-4 sm:p-5'>
            <Skeleton className='h-3.5 w-80 max-w-full rounded-none bg-ml-surface-2/60' />
          </div>
        </div>
      </div>
    </>
  );
}
