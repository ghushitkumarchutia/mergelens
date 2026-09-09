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
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";

export default function ReposLoading() {
  return (
    <>
      <DashboardHeader
        title='Repositories'
        description='All public and private repositories available to the GitHub App.'
      />

      <div className='flex flex-1 flex-col gap-4 p-4 sm:p-6 md:p-8 w-full max-w-7xl select-none'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
          <div className='h-8 w-full sm:w-fit rounded-none border border-ml-border bg-ml-surface-2 p-0.5 flex gap-1 items-center'>
            <div className='flex-1 sm:flex-initial rounded-none h-full px-3 font-manrope font-semibold text-xs text-ml-text bg-ml-surface flex items-center justify-center'>
              All
            </div>
            <div className='flex-1 sm:flex-initial rounded-none h-full px-3 font-manrope font-semibold text-xs text-ml-text-muted flex items-center justify-center'>
              Public
            </div>
            <div className='flex-1 sm:flex-initial rounded-none h-full px-3 font-manrope font-semibold text-xs text-ml-text-muted flex items-center justify-center'>
              Private
            </div>
          </div>

          <div className='relative w-full sm:max-w-xs'>
            <HugeiconsIcon
              icon={Search01Icon}
              className='absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-ml-text-muted pointer-events-none'
            />
            <div className='rounded-none border border-ml-border bg-ml-surface text-ml-text-muted pl-8 pr-7 h-8 font-manrope text-xs flex items-center select-none'>
              Search repositories…
            </div>
          </div>
        </div>

        <div className='rounded-none border border-ml-border bg-ml-surface overflow-hidden shadow-none'>
          <Table className='min-w-212.5 w-full'>
            <TableHeader className='bg-ml-surface-2 border-b border-ml-border'>
              <TableRow className='border-b border-ml-border hover:bg-transparent'>
                <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 min-w-55'>
                  Repository
                </TableHead>
                <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 w-27.5'>
                  Visibility
                </TableHead>
                <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 w-30'>
                  Branch
                </TableHead>
                <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 w-30'>
                  Language
                </TableHead>
                <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 text-right w-22.5'>
                  Stars
                </TableHead>
                <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 text-right w-35'>
                  Updated
                </TableHead>
                <TableHead className='font-manrope font-semibold text-[11px] uppercase tracking-wider text-ml-text-muted px-4 py-2.5 text-right w-30'>
                  Codebase
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 6 }).map((_, i) => (
                <TableRow
                  key={i}
                  className='border-b border-ml-border hover:bg-transparent'
                >
                  <TableCell className='px-4 py-3 min-w-55'>
                    <div className='flex flex-col gap-1.5'>
                      <Skeleton className='h-4 w-36 rounded-none bg-ml-surface-2' />
                      <Skeleton className='h-3 w-48 rounded-none bg-ml-surface-2/60' />
                    </div>
                  </TableCell>
                  <TableCell className='px-4 py-3 w-27.5'>
                    <Skeleton className='h-5 w-18 rounded-none bg-ml-surface-2/60' />
                  </TableCell>
                  <TableCell className='px-4 py-3 w-30'>
                    <Skeleton className='h-3.5 w-14 rounded-none bg-ml-surface-2/60' />
                  </TableCell>
                  <TableCell className='px-4 py-3 w-30'>
                    <Skeleton className='h-3.5 w-20 rounded-none bg-ml-surface-2/60' />
                  </TableCell>
                  <TableCell className='px-4 py-3 text-right w-22.5'>
                    <Skeleton className='h-3.5 w-10 ml-auto rounded-none bg-ml-surface-2/60' />
                  </TableCell>
                  <TableCell className='px-4 py-3 text-right w-35'>
                    <Skeleton className='h-3.5 w-22 ml-auto rounded-none bg-ml-surface-2/60' />
                  </TableCell>
                  <TableCell className='px-4 py-3 text-right w-30'>
                    <Skeleton className='h-7 w-16 ml-auto rounded-none bg-ml-surface-2 border border-ml-border' />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className='py-3 text-center font-manrope text-xs text-ml-text-muted'>
          Loading repositories…
        </div>
      </div>
    </>
  );
}
