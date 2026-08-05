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
import { Button } from "@/components/ui/button";

export default function PullRequestsLoading() {
  return (
    <>
      <DashboardHeader
        title='Pull Requests'
        description='All pull requests reviewed by the AI reviewer.'
      />
      <div className='flex flex-1 flex-col gap-4 p-6'>
        <div className='flex flex-wrap gap-2'>
           <Button size='sm' variant='default' disabled>All</Button>
           <Button size='sm' variant='outline' disabled>Pending</Button>
           <Button size='sm' variant='outline' disabled>Reviewed</Button>
           <Button size='sm' variant='outline' disabled>Rate Limited</Button>
        </div>

        <div className='rounded-none border border-border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PR</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='text-right'>Reviewed</TableHead>
                <TableHead className='text-right'>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className='flex flex-col gap-1'>
                      <Skeleton className='h-4 w-12' />
                      <Skeleton className='h-3 w-24' />
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className='h-4 w-64' /></TableCell>
                  <TableCell><Skeleton className='h-4 w-20' /></TableCell>
                  <TableCell><Skeleton className='h-5 w-24 rounded-full' /></TableCell>
                  <TableCell className='text-right'><Skeleton className='h-4 w-16 ml-auto' /></TableCell>
                  <TableCell className='text-right'><Skeleton className='h-4 w-16 ml-auto' /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
