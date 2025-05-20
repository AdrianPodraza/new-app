'use client'
import { ChevronRight } from 'lucide-react'
import React from 'react'
import { Progress } from '../ui/progress'
import Image from 'next/image'

import BudgetActions from './modals/BudgetActions'

interface Transaction {
  avatar: string
  name: string
  category: string
  date: string
  amount: number
  recurring: boolean
}

interface Budget {
  theme: string
  category: string
  maximum: number
}

interface Props {
  budget: Budget
  spent: number
  transactions: Transaction[]
  compact: boolean
  onDelete: (category: string) => void
  onEdit: (updated: { category: string; maximum: number; theme: string }) => void
}

function BudgetCard({ budget, spent, transactions, onDelete, onEdit }: Props) {
  const filteredTransactions = (category: string) => {
    return transactions.filter((transaction) => transaction.category === category).slice(0, 3)
  }

  const categoryTransactions = filteredTransactions(budget.category)
  console.log(budget)

  return (
    <div className='flex flex-col gap-6 rounded-lg bg-white p-4'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-3'>
          <p style={{ backgroundColor: budget.theme }} className='h-4 w-4 rounded-full bg-red-600' /> {budget.category}
        </div>
        <BudgetActions
          theme={budget.theme}
          initialCategory={budget.category}
          onDelete={() => onDelete(budget.category)}
          initialMaximum={budget.maximum}
          onEdit={onEdit}
        />
      </div>
      <p className='text-[14px] text-gray-500'>Maximum of {budget.maximum}$</p>
      <Progress color={budget.theme} value={(spent / budget.maximum) * 100} />
      <div className='flex'>
        <div className='flex h-10 flex-1 gap-2'>
          <span className='h-full w-2 rounded-full' style={{ backgroundColor: budget.theme }} />
          <div className='flex flex-col'>
            <p className='text-[14px] text-gray-500'>Spent</p>
            <p className='font-bold text-gray-900'>${spent}</p>
          </div>
        </div>
        <div className='flex h-10 flex-1 gap-2'>
          <span className='bg-beige-100 h-full w-2 rounded-full' />
          <div className='flex flex-col'>
            <p className='text-[14px] text-gray-500'>Remaining</p>
            <p className='font-bold text-gray-900'>${budget.maximum - spent < 0 ? 0 : budget.maximum - spent}</p>
          </div>
        </div>
      </div>
      <div className='bg-beige-100 rounded-lg p-4'>
        <div className='flex justify-between'>
          <h3 className='text-grey-900 text-[16px] font-bold'>Latest Spending</h3>
          <button className='text-grey-500 flex items-center gap-4'>
            See All <ChevronRight className='h-4' />
          </button>
        </div>
        <div className='flex flex-col gap-4'>
          {categoryTransactions.map((transaction) => (
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
                  className={`text-right text-[14px] font-bold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-gray-500'
                  }`}
                >
                  {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount)}
                </p>
                <p className='text-xs text-gray-500'>
                  {new Date(transaction.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BudgetCard
