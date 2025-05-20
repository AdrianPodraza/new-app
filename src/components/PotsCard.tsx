'use client'
import React, { useState } from 'react'
import { Progress } from '@/components/ui/progress'
import { Button } from './ui/button'
import PotActions from './pots/modals/PotsActions'
import AddMoney from './pots/modals/AddMoney'
import WithdrawMoney from './pots/modals/WithdrawMoney'

interface Pot {
  theme: string
  total: number
  target: number
  name: string
}

interface Props {
  pot: Pot
  onDelete: () => void
  onEdit: (updated: { name: string; target: number; theme: string }, originalName: string) => void
  existingNames: string[]
  onUpdateTotal: (name: string, newTotal: number) => void
}

function PotsCard({ pot, onDelete, onEdit, existingNames, onUpdateTotal }: Props) {
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false)
  const [addedValue, setAddedValue] = useState(0)
  const [withdrawValue, setWithdrawValue] = useState(0)
  const progressValue = Math.min(100, ((pot.total + addedValue + withdrawValue) / pot.target) * 100)
  const currentTotal = pot.total + addedValue + withdrawValue

  const handleAddMoney = () => {
    if (currentTotal >= pot.target) return
    setAddedValue((value) => value + 1)
  }

  const handleWithdraw = () => {
    if (currentTotal <= 0) return
    setWithdrawValue((value) => value - 1)
  }

  return (
    <div className='flex flex-1 flex-col gap-3 rounded-lg bg-white p-4'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-4'>
          <span style={{ backgroundColor: pot.theme }} className='aspect-square h-4 rounded-full' />
          <h4 className='text-xl font-bold text-gray-900'>{pot.name}</h4>
        </div>
        <PotActions
          initialName={pot.name}
          initialTarget={pot.target}
          theme={pot.theme}
          onDelete={onDelete}
          onEdit={onEdit}
          existingNames={existingNames}
        />
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-[14px] text-gray-500'>Total Saved</p>
        <p className='text-[32px] font-bold text-gray-900'>${currentTotal}</p>
      </div>
      <Progress color={pot.theme} value={progressValue} />
      <div className='text-grey-500 flex items-center justify-between text-xs'>
        <p className='font-bold'>{progressValue.toFixed(2)}%</p>
        <p>Target of ${pot.target}</p>
      </div>
      <div className='flex justify-between gap-4'>
        <Button
          className='bg-beige-100 flex-1 cursor-pointer p-8 font-bold text-gray-900 hover:text-gray-100'
          onClick={() => setIsAddOpen(true)}
        >
          + Add Money
        </Button>
        <Button
          className='bg-beige-100 flex-1 cursor-pointer p-8 font-bold text-gray-900 hover:text-gray-100'
          onClick={() => setIsWithdrawOpen(true)}
        >
          Withdraw
        </Button>
      </div>
      <AddMoney
        open={isAddOpen}
        setOpen={setIsAddOpen}
        name={pot.name}
        total={pot.total}
        target={pot.target}
        onConfirm={(amount) => {
          const newTotal = currentTotal + amount
          onUpdateTotal(pot.name, newTotal)
          setIsAddOpen(false)
        }}
      />
      <WithdrawMoney
        open={isWithdrawOpen}
        setOpen={setIsWithdrawOpen}
        name={pot.name}
        total={pot.total}
        target={pot.target}
        onConfirm={(amount) => {
          const newTotal = Math.max(0, currentTotal - amount)
          onUpdateTotal(pot.name, newTotal)
          setIsWithdrawOpen(false)
        }}
      />
    </div>
  )
}

export default PotsCard
