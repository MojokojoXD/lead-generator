import { ReactNode } from 'react';
import { DashboardNavbar } from '@/app/components/layout/DashboardNavbar';
export default function DashboardLayout( { children }: { children: ReactNode; } )
{
  return (
    <>
      <DashboardNavbar />
      { children }
    </>
  )
}