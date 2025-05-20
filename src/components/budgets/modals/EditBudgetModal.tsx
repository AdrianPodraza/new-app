'use client'
import React from 'react'
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
import { Ellipsis } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function EditBudgetModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Ellipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent className='rounded-lg bg-white p-2' sideOffset={20}>
            <DropdownMenuItem className='text-grey-900 text-[14px]'>Edit Budget</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='text-[14px] text-red-500'>Delete Budget</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </DialogTrigger>
      <DialogContent className='flex flex-col rounded-lg bg-white p-4'>
        <DialogHeader>
          <DialogTitle className='text-grey-900 text-[32px] font-bold'>Edit Budget</DialogTitle>
          <DialogDescription className='text-[14px] text-gray-500'>
            As your budgets change, feel free to update your spending limits.
          </DialogDescription>
        </DialogHeader>
        <Label className='text-xs font-bold text-gray-500' htmlFor='email'>
          Category
        </Label>
        <Select>
          <SelectTrigger className='flex w-full'>
            <SelectValue placeholder='Category' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='light'>Entertainment</SelectItem>
            <SelectItem value='dark'>Bills</SelectItem>
            <SelectItem value='dining-out'>Dining Out</SelectItem>
            <SelectItem value='transportation'>Transportation</SelectItem>
            <SelectItem value='personal-care'>Personal Care</SelectItem>
            <SelectItem value='education'>Education</SelectItem>
            <SelectItem value='lifestyle'>Lifestyle</SelectItem>
            <SelectItem value='shopping'>Shopping</SelectItem>
            <SelectItem value='general'>General</SelectItem>
          </SelectContent>
        </Select>
        <div className='grid w-full items-center gap-1.5'>
          <Label className='text-xs font-bold text-gray-500' htmlFor='email'>
            Maximum Spend
          </Label>
          <Input type='email' id='email' placeholder='$ e.g. 2000' />
        </div>
        <Label className='text-xs font-bold text-gray-500' htmlFor='email'>
          Theme
        </Label>
        <Select>
          <SelectTrigger className='flex w-full'>
            <SelectValue placeholder='Theme' />
          </SelectTrigger>
          <SelectContent side='bottom' className='max-h-[270px]'>
            <SelectItem value='Green'>Green</SelectItem>
            <SelectItem value='Yellow'>Yellow</SelectItem>
            <SelectItem value='Cyan-out'>Cyan</SelectItem>
            <SelectItem value='Navy'>Navy</SelectItem>
            <SelectItem value='Red-care'>Red</SelectItem>
            <SelectItem value='Purple'>Purple</SelectItem>
            <SelectItem value='Turquoise'>Turquoise</SelectItem>
            <SelectItem value='Brown'>Brown</SelectItem>
            <SelectItem value='Magenta'>Magenta</SelectItem>
            <SelectItem value='Blue'>Blue</SelectItem>
            <SelectItem value='Grey'>Grey</SelectItem>
            <SelectItem value='Army'>Army</SelectItem>
            <SelectItem value='Pink'>Pink</SelectItem>
            <SelectItem value='Yellow'>Yellow</SelectItem>
            <SelectItem value='Orange'>Orange</SelectItem>
          </SelectContent>
        </Select>
        <Button className='cursor-pointer'>Save Changes</Button>
      </DialogContent>
    </Dialog>
  )
}

export default EditBudgetModal
