import { DashboardHeader } from "@/features/dashboard/components/dashboard-header";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PullRequestsLoading() {
  return (
    <>
      <DashboardHeader
        title='Pull Requests'
        description='All pull requests reviewed by the AI reviewer.'
      />

      <div className='flex flex-1 flex-col gap-4 p-4 sm:p-6 md:p-8 w-full max-w-7xl select-none'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='h-8 w-full sm:w-fit rounded-none border border-ml-border bg-ml-surface-2 p-0.5 flex gap-1 items-center overflow-x-auto'>
            <div className='flex-1 sm:flex-initial rounded-none h-full px-3 font-manrope font-semibold text-xs text-ml-text bg-ml-surface border border-ml-border shadow-xs flex items-center justify-center'>
              All
            </div>
            <div className='flex-1 sm:flex-initial rounded-none h-full px-3 font-manrope font-semibold text-xs text-ml-text-muted flex items-center justify-center'>
              Pending
            </div>
            <div className='flex-1 sm:flex-initial rounded-none h-full px-3 font-manrope font-semibold text-xs text-ml-text-muted flex items-center justify-center'>
              Processing
            </div>
            <div className='flex-1 sm:flex-initial rounded-none h-full px-3 font-manrope font-semibold text-xs text-ml-text-muted flex items-center justify-center'>
              Reviewed
            </div>
            <div className='flex-1 sm:flex-initial rounded-none h-full px-3 font-manrope font-semibold text-xs text-ml-text-muted flex items-center justify-center'>
              Rate Limited
            </div>
          </div>
        </div>

        <div className='rounded-none border border-ml-border bg-ml-surface overflow-x-auto shadow-none'>
          <Table className='min-w-232 w-full'>
            <TableHeader className='bg-ml-surface-2 border-b border-ml-border'>
              <TableRow className='border-b border-ml-border hover:bg-transparent'>
                <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 min-w-44 sm:min-w-52'>
                  Pull Request
                </TableHead>
                <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 min-w-60 max-w-sm'>
                  Title
                </TableHead>
                <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 w-32'>
                  Author
                </TableHead>
                <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 w-32'>
                  Status
                </TableHead>
                <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 text-right w-32'>
                  Reviewed
                </TableHead>
                <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 text-right w-32'>
                  Created
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 6 }).map((_, i) => (
                <TableRow
                  key={i}
                  className='border-b border-ml-border hover:bg-transparent'
                >
                  <TableCell className='px-4 py-3 min-w-44 sm:min-w-52'>
                    <div className='flex flex-col gap-1.5'>
                      <Skeleton className='h-4 w-16 rounded-none bg-ml-surface-2' />
                      <Skeleton className='h-3 w-36 rounded-none bg-ml-surface-2/60' />
                    </div>
                  </TableCell>
                  <TableCell className='px-4 py-3 min-w-60 max-w-sm'>
                    <Skeleton className='h-4 w-52 sm:w-64 rounded-none bg-ml-surface-2' />
                  </TableCell>
                  <TableCell className='px-4 py-3 w-32'>
                    <Skeleton className='h-3.5 w-20 rounded-none bg-ml-surface-2/60' />
                  </TableCell>
                  <TableCell className='px-4 py-3 w-32'>
                    <Skeleton className='h-5 w-20 rounded-none bg-ml-surface-2/60' />
                  </TableCell>
                  <TableCell className='px-4 py-3 text-right w-32'>
                    <Skeleton className='h-3.5 w-16 ml-auto rounded-none bg-ml-surface-2/60' />
                  </TableCell>
                  <TableCell className='px-4 py-3 text-right w-32'>
                    <Skeleton className='h-3.5 w-16 ml-auto rounded-none bg-ml-surface-2/60' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className='py-3 text-center font-manrope text-xs text-ml-text-muted'>
          Loading pull requests…
        </div>
      </div>
    </>
  );
}
