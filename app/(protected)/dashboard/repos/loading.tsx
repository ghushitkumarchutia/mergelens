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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

export default function ReposLoading() {
  return (
    <>
      <DashboardHeader
        title='Repositories'
        description='All public and private repositories available to the GitHub App.'
      />
      
      <div className='flex flex-1 flex-col gap-4 p-6'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value='all'>All</TabsTrigger>
              <TabsTrigger value='public'>Public</TabsTrigger>
              <TabsTrigger value='private'>Private</TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="relative w-full max-w-xs">
             <Input placeholder='Search repositories…' disabled />
          </div>
        </div>

        <div className='rounded-none border border-border'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Repository</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Branch</TableHead>
                <TableHead>Language</TableHead>
                <TableHead className='text-right'>Stars</TableHead>
                <TableHead className='text-right'>Updated</TableHead>
                <TableHead className='text-right'>Codebase</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className='flex flex-col gap-1'>
                      <Skeleton className='h-4 w-32' />
                      <Skeleton className='h-3 w-48' />
                    </div>
                  </TableCell>
                  <TableCell><Skeleton className='h-5 w-16 rounded-full' /></TableCell>
                  <TableCell><Skeleton className='h-4 w-12' /></TableCell>
                  <TableCell><Skeleton className='h-4 w-16' /></TableCell>
                  <TableCell className='text-right'><Skeleton className='h-4 w-8 ml-auto' /></TableCell>
                  <TableCell className='text-right'><Skeleton className='h-4 w-20 ml-auto' /></TableCell>
                  <TableCell className='text-right'><Skeleton className='h-8 w-24 ml-auto rounded-md' /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
