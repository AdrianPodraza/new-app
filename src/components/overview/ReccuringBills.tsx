import { ChevronRight } from 'lucide-react'
import React, { useMemo } from 'react'
import data from '@/app/assets/data.json'
function ReccuringBills() {
  const reccuringTransactions = data.transactions
  const avgDate = '2024-07-29T13:51:29Z'
  const summaryBills = () => {
    const summary = {
      paidBills: { amount: 0 },
      totalUpcoming: { amount: 0 },
      dueSoon: { amount: 0 },
    }

    const avgDateObj = new Date(avgDate)
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000

    data.transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date)

      if (transactionDate < avgDateObj) {
        summary.paidBills.amount += Math.abs(transaction.amount)
      } else {
        summary.totalUpcoming.amount += Math.abs(transaction.amount)

        if (transactionDate.getTime() - avgDateObj.getTime() <= sevenDaysInMs) {
          summary.dueSoon.amount += Math.abs(transaction.amount)
        }
      }
    })

    return summary
  }

  const summary = useMemo(() => summaryBills(), [])
  return (
    <div className='row-span-2 flex h-fit flex-col gap-4 rounded-lg bg-white p-4 xl:col-span-2'>
      {' '}
      <div className='flex justify-between'>
        <h3 className='text-lg font-bold'>Reccuring Bills</h3>
        <button className='flex items-center gap-1 text-gray-500'>
          <span>See Details</span>
          <ChevronRight />
        </button>
      </div>
      <div className='bg-beige-100 flex justify-between rounded-sm border-l-4 border-green-100 px-4 py-4'>
        <p className='rounded-sm text-gray-500'>Paid Bills</p>
        <p className='font-bold text-gray-900'>${summary.paidBills.amount.toFixed(2)}</p>
      </div>
      <div className='bg-beige-100 flex justify-between rounded-sm border-l-4 border-yellow-100 px-4 py-4'>
        <p className='rounded-sm text-gray-500'>Total Upcoming</p>
        <p className='font-bold text-gray-900'>${summary.totalUpcoming.amount.toFixed(2)}</p>
      </div>
      <div className='bg-beige-100 flex justify-between rounded-sm border-l-4 border-cyan-100 px-4 py-4'>
        <p className='rounded-sm text-gray-500'>Due Soon</p>
        <p className='font-bold text-gray-900'>{summary.dueSoon.amount.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default ReccuringBills
