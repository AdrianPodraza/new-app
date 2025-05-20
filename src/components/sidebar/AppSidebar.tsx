'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

import { Home, ArrowUpDown, PieChartIcon as ChartPie, Receipt, ReceiptText } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const items = [
  { title: 'Overview', url: '/overview', icon: Home },
  { title: 'Transactions', url: '/transactions', icon: ArrowUpDown },
  { title: 'Budgets', url: '/budgets', icon: ChartPie },
  { title: 'Pots', url: '/pots', icon: Receipt },
  { title: 'Recurring', url: '/recurring-bills', icon: ReceiptText },
]

export function AppSidebar() {
  const pathname = usePathname()
  return (
    <>
      {/* Desktop Sidebar */}
      <Sidebar className='hidden border-none lg:flex [&>div]:rounded-r-lg'>
        <SidebarContent className='bg-grey-900 min-h-screen rounded-r-lg pr-4'>
          <SidebarGroup className='text-grey-300 p-0 font-bold'>
            <Image src='/assets/images/logo-large.svg' width={121} height={30} alt='logo' className='px-4 py-8' />
            <SidebarGroupContent>
              <SidebarMenu className='flex gap-6'>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className='rounded-l-none rounded-r-lg px-6 py-5'
                    >
                      <a href={item.url} className='flex items-center gap-3'>
                        <item.icon className='h-5 w-5' />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Mobile Bottom Navigation */}
      <div className='bg-grey-900 fixed right-0 bottom-0 left-0 z-50 border-t border-gray-700 lg:hidden'>
        <nav className='mx-auto max-w-md'>
          <ul className='flex items-center justify-around'>
            {items.map((item) => (
              <li key={item.title} className='flex-1 pt-2'>
                <a
                  href={item.url}
                  className='text-grey-300 hover:bg-grey-800 flex flex-col items-center rounded-t-xl border-4 border-transparent py-3 text-center hover:border-b-green-100 hover:bg-white'
                >
                  <item.icon className='mb-1 h-6 w-6' />
                  <span className='text-xs font-medium'>{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
