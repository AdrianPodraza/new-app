'use client'
import PotsCard from '@/components/PotsCard'
import React, { useState } from 'react'
import data from '@/app/assets/data.json'
import AddPotsButton from '@/components/pots/AddPotsButton'
import AddPotModal from '@/components/pots/modals/AddPotModal'
import AddMoney from '@/components/pots/modals/AddMoney'
import WithdrawMoney from '@/components/pots/modals/WithdrawMoney'

function Pots() {
  const [pots, setPots] = useState(data.pots)

  const handleUpdateTotal = (name: string, newTotal: number) => {
    setPots((prev) => prev.map((pot) => (pot.name === name ? { ...pot, total: newTotal } : pot)))
  }

  const handleAddPot = (newPot) => {
    setPots((prev) => [...prev, newPot])
  }

  const handleDelete = (name: string) => {
    setPots((prev) => prev.filter((pot) => pot.name !== name))
  }

  const handleEdit = (updated: { name: string; target: number; theme: string }, originalName: string) => {
    setPots((prev) => prev.map((pot) => (pot.name === originalName ? { ...pot, ...updated } : pot)))
  }

  return (
    <div className='mb-[100px] grid grid-cols-1 gap-4 md:grid-cols-2 xl:mb-0'>
      <AddPotsButton />
      {pots.map((pot) => (
        <PotsCard
          key={pot.name}
          pot={pot}
          onDelete={() => handleDelete(pot.name)}
          onEdit={(updated, originalName) => handleEdit(updated, originalName)}
          existingNames={pots.map((p) => p.name)}
          onUpdateTotal={handleUpdateTotal}
        />
      ))}

      <AddPotModal onAddPot={handleAddPot} />
    </div>
  )
}

export default Pots
