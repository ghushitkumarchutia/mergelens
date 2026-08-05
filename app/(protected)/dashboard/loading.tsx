import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <>
      <DashboardHeader
        title='Loading...'
        description='Fetching your data...'
      />
      <div className='flex flex-1 flex-col gap-6 p-6'>
        <div>
          <Skeleton className='h-7 w-48 mb-2' />
          <Skeleton className='h-4 w-72' />
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className='rounded-xl border bg-card text-card-foreground shadow'>
              <div className='p-6 flex flex-row items-center gap-4'>
                <Skeleton className='size-10 rounded-none' />
                <div className='space-y-2 flex-1'>
                  <Skeleton className='h-3 w-20' />
                  <Skeleton className='h-6 w-12' />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='rounded-xl border bg-card text-card-foreground shadow'>
              <div className='p-6 space-y-4'>
                <div className='space-y-2'>
                  <Skeleton className='h-5 w-32' />
                  <Skeleton className='h-4 w-full' />
                </div>
                <Skeleton className='h-9 w-32' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
