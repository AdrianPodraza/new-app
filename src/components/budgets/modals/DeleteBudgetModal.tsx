import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { DialogClose } from '@/components/ui/dialog'
function DeleteBudgetModal() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className='flex flex-col rounded-lg bg-white p-4'>
        <DialogHeader>
          <DialogTitle className='text-grey-900 text-[32px] font-bold'>Delete ‘Entertainment’?</DialogTitle>
          <DialogDescription className='text-[14px] text-gray-500'>
            Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will
            be removed forever.
          </DialogDescription>
        </DialogHeader>
        <Button className='cursor-pointer bg-red-500 text-white hover:bg-orange-500'>Yes, Confirm Deletion</Button>
        <DialogClose asChild>
          <Button className='cursor-pointer bg-transparent text-gray-500 shadow-none hover:bg-transparent'>
            No, Go Back
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteBudgetModal
