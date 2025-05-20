'use client'

import { Input } from '@/components/ui/input'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from '@/components/ui/pagination'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import { Separator } from '@radix-ui/react-separator'
import { ReceiptText, Search } from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import data from '@/app/assets/data.json'
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromUrlQuery } from '@/lib/url'
import { cn } from '@/lib/utils'

function RecurringBills() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pageParam = searchParams.get('page')
  const query = searchParams.get('search') || ''
  const sortOrder = searchParams.get('sort') || 'latest'
  const currentPage = pageParam ? parseInt(pageParam) : 1
  const [searchQuery, setSearchQuery] = useState(query)
  const reccuringTransactions = data.transactions.filter((transaction) => transaction.recurring)
  const transactionsPerPage: number = 8
  const totalPages = Math.ceil(reccuringTransactions.length / transactionsPerPage)

  const avgDate = '2024-07-29T13:51:29Z'

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const currentSearch = searchParams.get('search') || ''

      if (searchQuery !== currentSearch) {
        if (searchQuery) {
          let newUrl = formUrlQuery({
            params: searchParams.toString(),
            key: 'search',
            value: searchQuery,
          })

          newUrl = formUrlQuery({
            params: newUrl.split('?')[1],
            key: 'page',
            value: '1',
          })

          router.push(newUrl, { scroll: false })
        } else {
          let newUrl = removeKeysFromUrlQuery({
            params: searchParams.toString(),
            keysToRemove: ['search'],
          })

          newUrl = formUrlQuery({
            params: newUrl.split('?')[1],
            key: 'page',
            value: '1',
          })

          router.push(newUrl, { scroll: false })
        }
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [router, searchParams, searchQuery])

  const filteredTransactions = reccuringTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.date.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesSearch
  })

  const sortedTransactions = filteredTransactions.sort((a, b) => {
    switch (sortOrder) {
      case 'latest':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case 'a-z':
        return a.name.localeCompare(b.name)
      case 'z-a':
        return b.name.localeCompare(a.name)
      case 'highest':
        return b.amount - a.amount
      case 'lowest':
        return a.amount - b.amount
      default:
        return 0
    }
  })
  const startIndex = (currentPage - 1) * transactionsPerPage
  const paginatedTransactions = sortedTransactions.slice(startIndex, startIndex + transactionsPerPage)

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', sort)
    router.push(`/recurring-bills?${params.toString()}`)
  }
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`/recurring-bills?${params.toString()}`)
  }

  const handleDateColor = (date: string) => {
    const inputDate = new Date(date)
    const avgDateObj = new Date(avgDate)
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000 // 7 dni w milisekundach

    if (inputDate >= avgDateObj) {
      return 'green'
    } else if (avgDateObj.getTime() - inputDate.getTime() <= sevenDaysInMs) {
      return 'red'
    } else {
      return 'gray' // Domyślny kolor, jeśli nie spełnia żadnego warunku
    }
  }
  console.log(reccuringTransactions)

  const summaryBills = () => {
    const summary = {
      paidBills: { count: 0, amount: 0 },
      totalUpcoming: { count: 0, amount: 0 },
      dueSoon: { count: 0, amount: 0 },
    }

    const avgDateObj = new Date(avgDate)
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000

    reccuringTransactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date)

      if (transactionDate < avgDateObj) {
        summary.paidBills.count += 1
        summary.paidBills.amount += Math.abs(transaction.amount)
      } else {
        summary.totalUpcoming.count += 1
        summary.totalUpcoming.amount += Math.abs(transaction.amount)

        if (transactionDate.getTime() - avgDateObj.getTime() <= sevenDaysInMs) {
          summary.dueSoon.count += 1
          summary.dueSoon.amount += Math.abs(transaction.amount)
        }
      }
    })

    return summary
  }

  const summary = useMemo(() => summaryBills(), [reccuringTransactions])

  return (
    <div className='mb-[100px] grid w-full auto-rows-auto gap-4 md:grid-cols-2 xl:mb-0 xl:grid-cols-3 xl:grid-rows-4'>
      <div className='bg-grey-900 flex flex-col justify-between gap-6 rounded-lg p-6 md:col-span-1'>
        <ReceiptText className='h-10 w-10 text-white' />
        <div className='flex flex-col'>
          <p className='text-[14px] text-white'>Total Bills</p>
          <p className='text-[32px] font-bold text-white'>$384.98</p>
        </div>
      </div>
      <div className='row-start-3 flex w-full flex-col gap-4 rounded-lg bg-white p-6 md:col-span-full md:row-start-2 xl:col-span-2 xl:row-span-4'>
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <div className='relative w-full md:w-1/3'>
            <Input
              type='search'
              className='pr-10'
              placeholder='Szukaj...'
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
              }}
            />
            <Search className='pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-gray-400' />
          </div>

          <div className='flex items-center gap-4'>
            <p className='text-gray-500'>Sort by:</p>
            <Select value={sortOrder} onValueChange={handleSortChange}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Sortuj' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='latest'>Latest</SelectItem>
                <SelectItem value='oldest'>Oldest</SelectItem>
                <SelectItem value='a-z'>A to Z</SelectItem>
                <SelectItem value='z-a'>Z to A</SelectItem>
                <SelectItem value='highest'>Highest</SelectItem>
                <SelectItem value='lowest'>Lowest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* lista transakcji */}
        <div className='flex flex-col gap-4'>
          {paginatedTransactions.map((transaction) => (
            <div
              key={transaction.name + transaction.date}
              className='flex items-center justify-between border-b-1 border-b-gray-200 pb-4'
            >
              <div className='flex items-center gap-4'>
                <Image
                  src={transaction.avatar}
                  alt={transaction.name}
                  width={40}
                  height={40}
                  className='rounded-full'
                />
                <p className='text-[14px] font-bold text-gray-900'>{transaction.name}</p>
              </div>
              <div className='flex flex-col'>
                <p
                  className={`text-right text-[14px] font-bold ${
                    transaction.amount > 0 ? 'text-green-600' : 'text-gray-500'
                  }`}
                >
                  {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount)}
                </p>
                <p
                  className={cn(
                    'text-xs font-bold',
                    handleDateColor(transaction.date) === 'green' && 'text-green-500',
                    handleDateColor(transaction.date) === 'red' && 'text-red-500',
                    handleDateColor(transaction.date) === 'gray' && 'text-gray-500',
                  )}
                >
                  {new Date(transaction.date).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          ))}
          {/* paginacja */}
          <Pagination>
            <PaginationContent className='flex w-full justify-between'>
              {/* Poprzednia strona */}
              <PaginationItem>
                <PaginationPrevious
                  className='border-2'
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                />
              </PaginationItem>

              <div className='flex gap-1'>
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink onClick={() => handlePageChange(i + 1)} isActive={i + 1 === currentPage}>
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </div>
              {/* Następna strona */}
              <PaginationItem>
                <PaginationNext
                  className='border-2'
                  onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <div className='flex w-full flex-col gap-4 rounded-lg bg-white p-6'>
        {/* wyszukiwarka + sortowanie */}

        <div className='flex-col rounded-lg bg-white p-6'>
          <h3 className='text-grey-900 mb-5 text-[16px] font-bold'>Summary</h3>

          <div className='flex justify-between'>
            <p className='text-xs text-gray-500'>Paid Bills</p>
            <p className='text-xs font-bold text-gray-900'>
              {summary.paidBills.count} (${summary.paidBills.amount.toFixed(2)})
            </p>
          </div>
          <Separator className='my-2 h-[1px] bg-gray-200' />

          <div className='flex justify-between'>
            <p className='text-xs text-gray-500'>Total Upcoming</p>
            <p className='text-xs font-bold text-gray-900'>
              {summary.totalUpcoming.count} (${summary.totalUpcoming.amount.toFixed(2)})
            </p>
          </div>
          <Separator className='my-2 h-[1px] bg-gray-200' />

          <div className='flex justify-between'>
            <p className='text-xs text-red-500'>Due Soon</p>
            <p className='text-xs font-bold text-red-500'>
              {summary.dueSoon.count} (${summary.dueSoon.amount.toFixed(2)})
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecurringBills
