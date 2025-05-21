import Balance from '@/components/overview/Balance'
import Budgets from '@/components/overview/Budgets'
import Pots from '@/components/overview/Pots'
import ReccuringBills from '@/components/overview/ReccuringBills'
import Transactions from '@/components/overview/Transactions'
import React from 'react'
import data from '@/app/assets/data.json'

function Overview() {
  return (
    <div className='flex w-full flex-col gap-4'>
      <Balance />
      <div className='grid grid-flow-row auto-rows-auto grid-cols-1 gap-4 xl:grid-cols-5'>
        <Pots />

        <div className='col-span-1 xl:col-span-2 xl:row-span-2'>
          <Budgets budgets={data.budgets} detailed />
        </div>
        <Transactions />
        <ReccuringBills />
      </div>
    </div>
  )
}

export default Overview
