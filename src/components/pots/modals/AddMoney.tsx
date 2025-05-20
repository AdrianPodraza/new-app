'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { DollarSign } from 'lucide-react'

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  name: string
  total: number
  target: number
  onConfirm: (amount: number) => void
}

function AddMoney({ open, setOpen, name, total, target, onConfirm }: Props) {
  const [amountToAdd, setAmountToAdd] = useState<number>(0)

  const updatedTotal = total + amountToAdd
  const percentage = Math.min((updatedTotal / target) * 100, 100)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='bg-grey-900 absolute top-1/2 right-4 h-13 cursor-pointer text-[14px] font-bold hover:opacity-80'>
          sigma
        </Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col rounded-lg bg-white p-4'>
        <DialogHeader>
          <DialogTitle className='text-grey-900 text-[32px] font-bold'>Add to ‘{name}’</DialogTitle>
          <DialogDescription className='text-[14px] text-gray-500'>
            Add money to your pot and track your progress toward your target.
          </DialogDescription>
        </DialogHeader>

        <div className='flex justify-between'>
          <Label className='text-[14px] text-gray-500'>New Amount</Label>
          <p className='text-[32px] font-bold text-gray-900'>${updatedTotal.toFixed(2)}</p>
        </div>

        <div className='relative'>
          <Progress className='absolute -z-[1]' value={percentage} color={'#277c78'} roundedEdge />
          <Progress className='z-[1]' color={'#201F24'} value={(total / target) * 100} showRightBorder />
        </div>

        <div className='flex justify-between'>
          <span className='text-xs font-bold text-green-100'>{percentage.toFixed(2)}%</span>
          <p className='text-grey-500 text-xs'>Target of ${target}</p>
        </div>

        <Label className='text-[14px] text-gray-500'>Amount to Add</Label>
        <div className='relative'>
          <Input
            type='number'
            placeholder='eg. $400'
            className='px-8'
            onChange={(e) => setAmountToAdd(parseFloat(e.target.value) || 0)}
          />
          <DollarSign className='absolute top-1/2 left-2 h-4 -translate-y-1/2 text-gray-500' />
        </div>

        <Button
          className='cursor-pointer'
          onClick={() => {
            onConfirm(amountToAdd)
            setAmountToAdd(0)
          }}
        >
          Confirm Addition
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default AddMoney
