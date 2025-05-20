'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import AddBudgetButton from './budgets/buttons/AddBudgetButton'
import path from 'path'
import AddPotsButton from './pots/AddPotsButton'
import AddBudgetModal from './budgets/modals/addBudgetModal'

function Pathname() {
  const pathname = usePathname()

  const trimmedPathname = pathname.slice(1)
  const capitalizedPathname = trimmedPathname.charAt(0).toUpperCase() + trimmedPathname.slice(1)
  const formattedPathname = capitalizedPathname.replace(/-/g, ' ')

  return (
    <div className='flex items-center justify-between py-6'>
      <h2 className='text-grey-900 text-[32px] font-bold'>{formattedPathname}</h2>
    </div>
  )
}

export default Pathname
