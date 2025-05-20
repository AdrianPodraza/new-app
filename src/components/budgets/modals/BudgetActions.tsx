'use client'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Ellipsis } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface BudgetActionsProps {
  initialCategory: string
  theme: string
  onDelete: () => void
  initialMaximum: number
  onEdit: (updated: { category: string; maximum: number; theme: string }, originalCategory: string) => void
}

function BudgetActions({ initialCategory, onDelete, onEdit, theme, initialMaximum }: BudgetActionsProps) {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [category, setCategory] = useState(initialCategory)
  const [maximum, setMaximum] = useState(initialMaximum)
  const [themeState, setStateTheme] = useState(theme)
  console.log(theme)

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' size='icon' className='cursor-pointer'>
            <Ellipsis className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='rounded-lg bg-white p-2' sideOffset={20}>
          <DropdownMenuItem
            className='text-grey-900 text-[14px]'
            onClick={() => {
              setCategory(initialCategory)
              setMaximum(maximum)
              setStateTheme(theme)
              setDropdownOpen(false)
              setEditOpen(true)
            }}
          >
            Edit Budget
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='text-[14px] text-red-500'
            onClick={() => {
              setDropdownOpen(false)
              setDeleteOpen(true)
            }}
          >
            Delete Budget
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className='flex flex-col rounded-lg bg-white p-4'>
          <DialogHeader>
            <DialogTitle className='text-grey-900 text-[32px] font-bold'>Edit Budget</DialogTitle>
            <DialogDescription className='text-[14px] text-gray-500'>
              As your budgets change, feel free to update your spending limits.
            </DialogDescription>
          </DialogHeader>
          <Label className='text-xs font-bold text-gray-500'>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className='flex w-full'>
              <SelectValue placeholder='Category' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Entertainment'>Entertainment</SelectItem>
              <SelectItem value='Bills'>Bills</SelectItem>
              <SelectItem value='Dining Out'>Dining Out</SelectItem>
              <SelectItem value='Transportation'>Transportation</SelectItem>
              <SelectItem value='Personal Care'>Personal Care</SelectItem>
              <SelectItem value='Education'>Education</SelectItem>
              <SelectItem value='Lifestyle'>Lifestyle</SelectItem>
              <SelectItem value='Shopping'>Shopping</SelectItem>
              <SelectItem value='General'>General</SelectItem>
            </SelectContent>
          </Select>
          <Label className='text-xs font-bold text-gray-500'>Maximum Spend</Label>
          <Input
            type='number'
            placeholder='$ e.g. 2000'
            value={maximum}
            onChange={(e) => setMaximum(parseFloat(e.target.value))}
          />
          <Label className='text-xs font-bold text-gray-500'>Theme</Label>
          <Select value={themeState} onValueChange={setStateTheme}>
            <SelectTrigger className='flex w-full'>
              <SelectValue placeholder='Theme' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='#277C78'>Green</SelectItem>
              <SelectItem value='#f2cdac'>Yellow</SelectItem>
              <SelectItem value='#82c9d7'>Cyan</SelectItem>
              <SelectItem value='#626070'>Navy</SelectItem>
              <SelectItem value='#c94736'>Red</SelectItem>
              <SelectItem value='#826cb0'>Purple</SelectItem>
              <SelectItem value='#597c7c'>Turquoise</SelectItem>
              <SelectItem value='#93674f'>Brown</SelectItem>
              <SelectItem value='#934f6f'>Magenta</SelectItem>
              <SelectItem value='#3f82b2'>Blue</SelectItem>
              <SelectItem value='#696868'>Grey</SelectItem>
              <SelectItem value='#7f9161'>Army</SelectItem>
              <SelectItem value='#af81ba'>Pink</SelectItem>
              <SelectItem value='#be6c49'>Orange</SelectItem>
            </SelectContent>
          </Select>
          <Button
            className='mt-4 cursor-pointer'
            onClick={() => {
              onEdit(
                {
                  category,
                  maximum: maximum,
                  theme: themeState,
                },
                initialCategory,
              )
              setEditOpen(false)
            }}
          >
            Save Changes
          </Button>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className='flex flex-col rounded-lg bg-white p-4'>
          <DialogHeader>
            <DialogTitle className='text-grey-900 text-[32px] font-bold'>Delete &apos;{category}&apos;?</DialogTitle>
            <DialogDescription className='text-[14px] text-gray-500'>
              Are you sure you want to delete this budget? This action cannot be reversed.
            </DialogDescription>
          </DialogHeader>
          <Button
            className='cursor-pointer bg-red-500 text-white hover:bg-red-600'
            onClick={() => {
              onDelete()
              setDeleteOpen(false)
            }}
          >
            Yes, Confirm Deletion
          </Button>
          <DialogClose asChild>
            <Button variant='outline' className='cursor-pointer text-gray-500'>
              No, Go Back
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default BudgetActions
