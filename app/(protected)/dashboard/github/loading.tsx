import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { Skeleton } from "@/components/ui/skeleton";

export default function GithubLoading() {
  return (
    <>
      <DashboardHeader
        title='GitHub App'
        description='Install or disconnect the reviewer app on your GitHub account.'
      />

      <div className='flex flex-1 flex-col p-4 sm:p-6 md:p-8 w-full max-w-3xl space-y-6 select-none'>
        <div className='rounded-none border border-ml-border bg-ml-surface shadow-none ring-0 gap-0 overflow-hidden'>
          <div className='border-b border-ml-border p-5 sm:p-6'>
            <div className='flex flex-col sm:flex-row sm:items-start justify-between gap-4'>
              <div className='flex items-start gap-3.5'>
                <Skeleton className='size-10 shrink-0 rounded-none border border-ml-border bg-ml-surface-2' />
                <div className='space-y-2'>
                  <Skeleton className='h-5 w-32 rounded-none bg-ml-surface-2' />
                  <Skeleton className='h-3.5 w-72 sm:w-96 max-w-full rounded-none bg-ml-surface-2/70' />
                </div>
              </div>
              <div className='shrink-0 self-start'>
                <Skeleton className='h-5 w-24 rounded-none border border-ml-border bg-ml-surface-2/60' />
              </div>
            </div>
          </div>

          <div className='p-5 sm:p-6 space-y-3'>
            <Skeleton className='h-3.5 w-56 rounded-none bg-ml-surface-2/70' />
            <div className='space-y-2.5 pt-1'>
              <div className='flex items-center gap-2'>
                <div className='size-1.5 bg-ml-surface-2 shrink-0' />
                <Skeleton className='h-3.5 w-80 sm:w-96 max-w-full rounded-none bg-ml-surface-2/60' />
              </div>
              <div className='flex items-center gap-2'>
                <div className='size-1.5 bg-ml-surface-2 shrink-0' />
                <Skeleton className='h-3.5 w-64 sm:w-80 max-w-full rounded-none bg-ml-surface-2/60' />
              </div>
              <div className='flex items-center gap-2'>
                <div className='size-1.5 bg-ml-surface-2 shrink-0' />
                <Skeleton className='h-3.5 w-72 sm:w-88 max-w-full rounded-none bg-ml-surface-2/60' />
              </div>
            </div>
          </div>

          <div
            className='border-t border-ml-border px-5 pb-4 sm:px-6 sm:pb-5 flex flex-col items-center gap-3 bg-ml-bg/40'
            style={{ paddingTop: "28px" }}
          >
            <Skeleton className='h-10 w-full rounded-none bg-ml-surface-2 border border-ml-border' />
            <Skeleton className='h-3 w-44 rounded-none bg-ml-surface-2/50' />
          </div>
        </div>
      </div>
    </>
  );
}
