import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import data from '@/app/assets/data.json'

function Pots() {
  const potsData = data.pots
  const totalSaved = potsData.reduce((acc, cur) => acc + cur.total, 0)

  return (
    <div className='row-start-1 flex h-fit flex-col gap-4 rounded-lg bg-white p-8 xl:col-span-3 xl:row-span-1'>
      <div className='flex justify-between'>
        <h3 className='text-grey-900 text-[20px] font-bold'>Pots</h3>
        <button className='cursor-pointer text-gray-500'>
          <a className='flex gap-1' href='./pots'>
            <p>See Details</p>
            <ChevronRight />
          </a>
        </button>
      </div>
      <div className='flex gap-2'>
        <div className='bg-beige-100 flex flex-1 gap-5 rounded-lg p-4'>
          <Image src='/assets/images/icon-pot.svg' width={27} height={35} alt='pot-icon' />
          <div className='flex flex-col gap-2'>
            <p className='text-grey-500 text-[13px]'>Total Saved</p>
            <p className='text-grey-900 text-[32px] font-bold'>${totalSaved.toFixed()}</p>
          </div>
        </div>
        <div className='grid flex-1 grid-cols-2 gap-2'>
          {potsData.map((pot) => (
            <div className='flex gap-3' key={pot.name}>
              <div style={{ backgroundColor: pot.theme }} className='h-full w-2 rounded-full' />
              <div className='flex flex-col justify-between rounded-lg'>
                <h4 className='text-grey-500 text-xs'>{pot.name}</h4>
                <p className='text-grey-900 text-[14px] font-bold'>${pot.total}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Pots
