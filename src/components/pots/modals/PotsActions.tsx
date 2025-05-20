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
import { toast } from 'sonner'
import { AnimatePresence, motion } from 'framer-motion'

interface PotActionsProps {
  initialName: string
  theme: string
  initialTarget: number
  onDelete: () => void
  onEdit: (updated: { name: string; target: number; theme: string }, originalName: string) => void
  existingNames: string[]
}

function PotActions({ initialName, onDelete, onEdit, theme, initialTarget, existingNames }: PotActionsProps) {
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [name, setName] = useState(initialName)
  const [target, setTarget] = useState(initialTarget)
  const [themeState, setThemeState] = useState(theme)

  const resetForm = () => {
    setName(initialName)
    setTarget(initialTarget)
    setThemeState(theme)
  }

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
              resetForm()
              setDropdownOpen(false)
              setEditOpen(true)
            }}
          >
            Edit Pot
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='text-[14px] text-red-500'
            onClick={() => {
              setDropdownOpen(false)
              setDeleteOpen(true)
            }}
          >
            Delete Pot
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <div className='flex flex-col rounded-lg bg-white p-4'>
            <DialogHeader>
              <DialogTitle className='text-grey-900 text-[32px] font-bold'>Edit Pot</DialogTitle>
              <DialogDescription className='text-[14px] text-gray-500'>
                Update your savings goal or rename your pot.
              </DialogDescription>
            </DialogHeader>
            <Label className='text-xs font-bold text-gray-500'>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder='e.g. Vacation Fund' />
            <Label className='text-xs font-bold text-gray-500'>Target</Label>
            <Input
              type='number'
              placeholder='e.g. 2000'
              value={target}
              onChange={(e) => setTarget(parseFloat(e.target.value))}
            />
            <Label className='text-xs font-bold text-gray-500'>Theme</Label>
            <Select value={themeState} onValueChange={setThemeState}>
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
                    name,
                    target: parseFloat(target.toString()),
                    theme: themeState,
                  },
                  initialName,
                )
                toast.success('Pot updated successfully!')
                setEditOpen(false)
              }}
            >
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className='flex flex-col rounded-lg bg-white p-4'>
          <DialogHeader>
            <DialogTitle className='text-grey-900 text-[32px] font-bold'>Delete '{name}'?</DialogTitle>
            <DialogDescription className='text-[14px] text-gray-500'>This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <Button
            className='cursor-pointer bg-red-500 text-white hover:bg-red-600'
            onClick={() => {
              onDelete()
              toast.success('Pot deleted.')
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

export default PotActions
