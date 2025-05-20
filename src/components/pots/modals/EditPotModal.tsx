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

interface Pot {
  potName: string
  theme: string
  limit: number
}

function EditPotModal({ onAddPot }: { onAddPot: (Pot: Pot) => void }) {
  const [potName, setPotName] = useState('')
  const [theme, setTheme] = useState('')
  const [maxSpend, setMaxSpend] = useState('')
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    const newPot = {
      potName,
      theme,
      limit: parseFloat(maxSpend),
    }

    onAddPot(newPot)
    setOpen(false)
    setPotName('')
    setTheme('')
    setMaxSpend('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className='flex flex-col rounded-lg bg-white p-4'>
        <DialogHeader>
          <DialogTitle className='text-grey-900 text-[32px] font-bold'>Edit Pot</DialogTitle>
          <DialogDescription className='text-[14px] text-gray-500'>
            If your saving targets change, feel free to update your pots.
          </DialogDescription>
        </DialogHeader>

        <Label className='text-xs font-bold text-gray-500'>Pot Name</Label>
        <Input
          type='text'
          value={potName}
          onChange={(e) => setPotName(e.target.value)}
          placeholder='e.g. Rainy Days'
        ></Input>
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
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default EditPotModal
