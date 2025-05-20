import { Button } from '@/components/ui/button'
import React from 'react'

function AddPotsButton() {
  return (
    <Button className='bg-grey-900 absolute top-4 right-4 h-13 text-[14px] font-bold hover:opacity-80'>
      + Add New Pot
    </Button>
  )
}

export default AddPotsButton
