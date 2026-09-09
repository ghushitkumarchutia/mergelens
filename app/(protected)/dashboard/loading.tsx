import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <>
      <DashboardHeader
        title='Overview'
        description='Your AI code review dashboard at a glance.'
      />
      <div className='flex flex-1 flex-col gap-6 p-4 sm:p-6 md:p-8 w-full max-w-7xl select-none'>
        <div>
          <Skeleton className='h-7 sm:h-8 w-56 sm:w-64 rounded-none bg-ml-surface-2 mb-1.5' />
          <Skeleton className='h-4 w-72 sm:w-96 rounded-none bg-ml-surface-2/60' />
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className='rounded-none border border-ml-border bg-ml-surface p-4 sm:p-5 flex items-center gap-4'
            >
              <Skeleton className='size-13 rounded-none bg-ml-surface-2 shrink-0' />
              <div className='h-13 flex flex-col justify-between py-0.5 flex-1 min-w-0'>
                <Skeleton className='h-3.5 w-20 rounded-none bg-ml-surface-2/60' />
                <Skeleton className='h-7 w-16 rounded-none bg-ml-surface-2' />
              </div>
            </div>
          ))}
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className='rounded-none border border-ml-border bg-ml-surface flex flex-col justify-between'
            >
              <div className='p-5 border-b border-ml-border space-y-3'>
                <div className='flex items-center justify-between gap-2'>
                  <Skeleton className='h-4 w-28 rounded-none bg-ml-surface-2' />
                  <Skeleton className='h-4 w-18 rounded-none bg-ml-surface-2/60' />
                </div>
                <Skeleton className='h-8 w-full rounded-none bg-ml-surface-2/60' />
              </div>
              <div className='p-5 pt-4'>
                <Skeleton className='h-8 w-36 rounded-none bg-ml-surface-2' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
