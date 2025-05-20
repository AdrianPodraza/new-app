import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import '../globals.css'
import { AppSidebar } from '@/components/sidebar/AppSidebar'
import Pathname from '@/components/Pathname'
import { Toaster } from '@/components/ui/sonner'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <div className='bg-beige-100 w-full'>
          <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger className='hidden lg:flex' />
            <div className='flex w-full flex-col px-8'>
              <Pathname />
              {children}
              <Toaster />
            </div>
          </SidebarProvider>
        </div>
      </body>
    </html>
  )
}
