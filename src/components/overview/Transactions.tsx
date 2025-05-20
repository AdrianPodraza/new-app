'use client'
import { ChevronRight } from 'lucide-react'
import React from 'react'
import Image from 'next/image'

import data from '@/app/assets/data.json'

export default function Transactions() {
  const transactions = data.transactions.slice(0, 5)

  return (
    <div className='col-span-1 col-start-1 row-span-3 flex h-fit flex-col gap-8 rounded-lg bg-white p-8 xl:col-span-3'>
      <div className='flex justify-between'>
        <h3 className='text-lg font-bold'>Transactions</h3>
        <button className='flex items-center gap-1 text-gray-500'>
          <span>See Details</span>
          <ChevronRight />
        </button>
      </div>
      <div className='flex flex-col gap-4'>
        {transactions.map((transaction) => {
          return (
            <div
              key={transaction.name + transaction.date}
              className='flex items-center justify-between border-b-1 border-b-gray-200 pb-4'
            >
              <div className='flex items-center gap-4'>
                <Image
                  src={transaction.avatar}
                  alt={transaction.name}
                  width={40}
                  height={40}
                  className='rounded-full'
                />

                <p className='text-[14px] font-bold text-gray-900'>{transaction.name}</p>
              </div>
              <div className='flex flex-col'>
                <p
                  className={`text-right text-[14px] font-bold ${transaction.amount > 0 ? 'text-green-100' : 'text-gray-500'}`}
                >
                  {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount)}
                </p>
                <p className='text-xs text-gray-500'>
                  {' '}
                  {new Date(transaction.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
