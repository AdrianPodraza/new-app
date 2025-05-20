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

function WithdrawMoney({ open, setOpen, name, total, target, onConfirm }: Props) {
  const [withdrawAmount, setWithdrawAmount] = useState<number>(0)

  const basePercentage = (total / target) * 100
  const updatedTotal = Math.max(0, total - withdrawAmount)
  const updatedPercentage = Math.max(0, (updatedTotal / target) * 100)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='bg-grey-900 absolute top-1/2 right-20 h-13 cursor-pointer text-[14px] font-bold hover:opacity-80'>
          sigma 2
        </Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col rounded-lg bg-white p-4'>
        <DialogHeader>
          <DialogTitle className='text-grey-900 text-[32px] font-bold'>Withdraw from ‘{name}’</DialogTitle>
          <DialogDescription className='text-[14px] text-gray-500'>
            Withdraw money from your pot. The black progress bar updates live.
          </DialogDescription>
        </DialogHeader>

        <div className='flex justify-between'>
          <Label className='text-[14px] text-gray-500'>New Amount</Label>
          <p className='text-[32px] font-bold text-gray-900'>${updatedTotal.toFixed(2)}</p>
        </div>

        <div className='relative'>
          {/* Background (red) stays static */}
          <Progress className='absolute -z-[1]' value={basePercentage} color={'#C94736'} roundedEdge />

          {/* Foreground (black) updates in real-time */}
          <Progress className='z-[1]' color={'#201F24'} value={updatedPercentage} showRightBorder />
        </div>

        <div className='flex justify-between'>
          <span className='text-xs font-bold text-red-500'>{updatedPercentage.toFixed(2)}%</span>
          <p className='text-grey-500 text-xs'>Target of ${target}</p>
        </div>

        <Label className='text-[14px] text-gray-500'>Amount to Withdraw</Label>
        <div className='relative'>
          <Input
            type='number'
            placeholder='eg. $400'
            className='px-8'
            onChange={(e) => setWithdrawAmount(parseFloat(e.target.value) || 0)}
          />
          <DollarSign className='absolute top-1/2 left-2 h-4 -translate-y-1/2 text-gray-500' />
        </div>

        <Button
          className='cursor-pointer'
          onClick={() => {
            onConfirm(withdrawAmount)
            setWithdrawAmount(0)
          }}
        >
          Confirm Withdrawal
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default WithdrawMoney
