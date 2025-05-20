import Image from 'next/image'
import '../globals.css'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <div className='bg-beige-500 flex gap-6 p-4'>
          <div className='relative hidden w-1/2 xl:block'>
            <Image
              src='/assets/images/illustration-authentication.svg'
              alt='illustration-authentication'
              fill
              className='rounded-lg object-cover'
            />
            <div className='absolute inset-0 flex h-full flex-col justify-between p-12 text-white'>
              <Image src='/assets/images/logo-large.svg' width={122} height={22} alt='logo' className='' />
              <div className='flex w-3/4 flex-col gap-4'>
                <p className='text-[32px] leading-8 font-bold'>Keep track of your money and save for your future</p>
                <p className='text-[14px]'>
                  Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to
                  savings pots easily.
                </p>
              </div>
            </div>
          </div>

          {children}
        </div>
      </body>
    </html>
  )
}
