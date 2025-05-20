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

function AddPotModal({ onAddPot }: { onAddPot: (Pot: any) => void }) {
  const [name, setName] = useState('')
  const [target, setTarget] = useState(0)
  const [total, setTotal] = useState(0)
  const [theme, setTheme] = useState('')
  const [open, setOpen] = useState(false)

  const handleSubmit = () => {
    const newPot = {
      name,
      theme,
      target,
      total,
    }
    console.log(newPot)

    onAddPot(newPot)
    setTotal(0)
    setOpen(false)
    setName('')
    setTheme('')
    setTarget(0)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='bg-grey-900 absolute top-4 right-4 h-13 cursor-pointer text-[14px] font-bold hover:opacity-80'>
          + Add New Pot
        </Button>
      </DialogTrigger>
      <DialogContent className='flex flex-col rounded-lg bg-white p-4'>
        <DialogHeader>
          <DialogTitle className='text-grey-900 text-[32px] font-bold'>Add New Pot</DialogTitle>
          <DialogDescription className='text-[14px] text-gray-500'>
            Create a pot to set savings targets. These can help keep you on track as you save for special purchases.
          </DialogDescription>
        </DialogHeader>

        <Label className='text-xs font-bold text-gray-500'>Pot Name</Label>
        <Input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='e.g. Rainy Days'></Input>
        <Label className='text-xs font-bold text-gray-500'>Target</Label>
        <Input
          type='number'
          value={target}
          onChange={(e) => setTarget(parseInt(e.target.value))}
          placeholder='$ e.g. 2000'
        />

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
          Add Pot
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default AddPotModal
