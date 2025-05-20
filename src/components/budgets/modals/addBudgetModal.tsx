'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

function AddBudgetModal({ onAddBudget }: { onAddBudget: (budget: any) => void }) {
  const [category, setCategory] = useState('')
  const [theme, setTheme] = useState('')
  const [maxSpend, setMaxSpend] = useState('')
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    const newBudget = {
      category,
      theme,
      maximum: parseFloat(maxSpend),
    }

    onAddBudget(newBudget)
    setOpen(false)
    setCategory('')
    setTheme('')
    setMaxSpend('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='bg-grey-900 absolute top-4 right-4 h-13 cursor-pointer text-[14px] font-bold hover:opacity-80'>
          + Add New Budget
        </Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col rounded-lg bg-white p-4'>
        <DialogHeader>
          <DialogTitle className='text-grey-900 text-[32px] font-bold'>Add New Budget</DialogTitle>
          <DialogDescription className='text-[14px] text-gray-500'>
            Choose a category to set a spending budget. These categories can help you monitor spending.
          </DialogDescription>
        </DialogHeader>

        <Label className='text-xs font-bold text-gray-500'>Category</Label>
        <Select onValueChange={setCategory}>
          <SelectTrigger className='flex w-full'>
            <SelectValue placeholder='Category' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='entertainment'>Entertainment</SelectItem>
            <SelectItem value='bills'>Bills</SelectItem>
            <SelectItem value='dining-out'>Dining Out</SelectItem>
            <SelectItem value='transportation'>Transportation</SelectItem>
            <SelectItem value='personal-care'>Personal Care</SelectItem>
            <SelectItem value='education'>Education</SelectItem>
            <SelectItem value='lifestyle'>Lifestyle</SelectItem>
            <SelectItem value='shopping'>Shopping</SelectItem>
            <SelectItem value='general'>General</SelectItem>
          </SelectContent>
        </Select>

        <Label className='text-xs font-bold text-gray-500'>Maximum Spend</Label>
        <Input type='number' value={maxSpend} onChange={(e) => setMaxSpend(e.target.value)} placeholder='$ e.g. 2000' />

        <Label className='text-xs font-bold text-gray-500'>Theme</Label>
        <Select onValueChange={setTheme}>
          <SelectTrigger className='flex w-full'>
            <SelectValue placeholder='Theme' />
          </SelectTrigger>
          <SelectContent side='bottom' className='max-h-[270px]'>
            <SelectItem value='Green'>Green</SelectItem>
            <SelectItem value='Yellow'>Yellow</SelectItem>
            <SelectItem value='Cyan'>Cyan</SelectItem>
            <SelectItem value='Navy'>Navy</SelectItem>
            <SelectItem value='Red'>Red</SelectItem>
            <SelectItem value='Purple'>Purple</SelectItem>
            <SelectItem value='Turquoise'>Turquoise</SelectItem>
            <SelectItem value='Brown'>Brown</SelectItem>
            <SelectItem value='Magenta'>Magenta</SelectItem>
            <SelectItem value='Blue'>Blue</SelectItem>
            <SelectItem value='Grey'>Grey</SelectItem>
            <SelectItem value='Army'>Army</SelectItem>
            <SelectItem value='Pink'>Pink</SelectItem>
            <SelectItem value='Orange'>Orange</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSubmit} className='cursor-pointer'>
          Add Budget
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default AddBudgetModal
