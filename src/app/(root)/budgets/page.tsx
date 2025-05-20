'use client'
import React, { useState } from 'react'
import data from '@/app/assets/data.json'

import AddBudgetModal from '@/components/budgets/modals/addBudgetModal'
import BudgetCard from '@/components/budgets/BudgetCard'

import Budgets from '@/components/overview/Budgets'
import { toast } from 'sonner'

export default function Page() {
  const [budgets, setBudgets] = useState(data.budgets)

  const handleAddBudget = (newBudget: { category: string; maximum?: number; theme?: string }) => {
    const categoryExists = budgets.some((b) => b.category.toLowerCase() === newBudget.category.toLowerCase())

    if (categoryExists) {
      toast.error('A budget with this category already exists.')
      return
    }

    const safeBudget = {
      category: String(newBudget.category),
      maximum: typeof newBudget.maximum === 'number' ? newBudget.maximum : 0,
      theme: typeof newBudget.theme === 'string' ? newBudget.theme : '',
    }

    setBudgets((prev) => [...prev, safeBudget])
    toast.success(`Added new budget: ${safeBudget.category}`)
  }
  const calculateAmount = (category: string) => {
    return Math.abs(
      data.transactions
        .filter((transaction) => transaction.category === category && transaction.amount < 0)
        .reduce((acc, curr) => acc + curr.amount, 0),
    )
  }

  const handleDelete = (categoryToDelete: string) => {
    if (budgets.length <= 1) {
      toast.error('You must have at least one budget.')
      return
    }

    setBudgets((prev) => prev.filter((b) => b.category !== categoryToDelete))
    toast.success(`Deleted budget: ${categoryToDelete}`)
  }
  const handleEdit = (updated: { category: string; maximum: number; theme: string }, originalCategory: string) => {
    const categoryExists = budgets.some(
      (b) => b.category.toLowerCase() === updated.category.toLowerCase() && b.category !== originalCategory,
    )

    if (categoryExists) {
      toast.error('A budget with this category already exists.')
      return
    }

    setBudgets((prev) => prev.map((b) => (b.category === originalCategory ? { ...b, ...updated } : b)))
    toast.success(`Updated budget: ${updated.category}`)
  }
  return (
    <div className='mb-[100px] grid gap-4 xl:mb-0 xl:grid-cols-2'>
      <Budgets budgets={budgets} colSpan={1} rowSpan={1} />
      <div className='flex flex-col gap-4'>
        {budgets.map((budget, index) => (
          <BudgetCard
            key={index}
            budget={budget}
            spent={calculateAmount(budget.category)}
            transactions={data.transactions}
            compact={false}
            onDelete={handleDelete}
            onEdit={(updated) => handleEdit(updated, budget.category)}
          />
        ))}
      </div>

      <AddBudgetModal onAddBudget={handleAddBudget} />
    </div>
  )
}
