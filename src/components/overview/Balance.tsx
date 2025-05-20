import React from 'react'

function Balance() {
  return (
    <div className='flex w-full flex-col gap-4 md:flex-row'>
      <div className='bg-grey-900 flex flex-1 flex-col rounded-lg p-4'>
        <p className='text-[14px] text-white'>Current Balance</p>
        <span className='text-[32px] font-bold text-white'>$4,836.00</span>
      </div>
      <div className='flex flex-1 flex-col rounded-lg bg-white p-4'>
        <p className='text-grey-500 text-[14px]'>Income</p>
        <span className='text-grey-900 text-[32px] font-bold'>$3,814.25</span>
      </div>
      <div className='flex flex-1 flex-col rounded-lg bg-white p-4'>
        <p className='text-grey-500 text-[14px]'>Expenses</p>
        <span className='text-grey-900 text-[32px] font-bold'>$1,700.50</span>
      </div>
    </div>
  )
}

export default Balance
