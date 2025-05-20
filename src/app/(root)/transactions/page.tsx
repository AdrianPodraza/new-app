'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import data from '@/app/assets/data.json'
import { Search } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { formUrlQuery, removeKeysFromUrlQuery } from '@/lib/url'

export default function Transactions() {
  const router = useRouter()

  const searchParams = useSearchParams()

  const pageParam = searchParams.get('page')
  const query = searchParams.get('search') || ''
  const sortOrder = searchParams.get('sort') || 'latest'
  const categoryParam = searchParams.get('category') || 'all'
  const currentPage = pageParam ? parseInt(pageParam) : 1
  const transactions = data.transactions

  const [selectedCategory, setSelectedCategory] = useState(categoryParam)
  const [searchQuery, setSearchQuery] = useState(query)

  const transactionsPerPage = 10
  const totalPages = Math.ceil(transactions.length / transactionsPerPage)

  // Debouncing search
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

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.date.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory =
      selectedCategory === 'all' || selectedCategory === 'All Transactions' || transaction.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  // Sortuj transakcje na podstawie sortOrder
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

  // Paginacja
  const startIndex = (currentPage - 1) * transactionsPerPage
  const paginatedTransactions = sortedTransactions.slice(startIndex, startIndex + transactionsPerPage)

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push(`/transactions?${params.toString()}`)
  }

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', sort)
    router.push(`/transactions?${params.toString()}`)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    const params = new URLSearchParams(searchParams)
    params.set('category', category)
    params.set('page', '1') // resetuj paginację przy zmianie kategorii
    router.push(`/transactions?${params.toString()}`)
  }

  return (
    <div className='mb-[100px] flex w-full flex-col gap-4 rounded-lg bg-white p-6 xl:mb-0'>
      {/* wyszukiwarka + sortowanie */}
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
          <p className='text-gray-500'>Category:</p>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='All transactions' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Transactions</SelectItem>
              <SelectItem value='Entertainment'>Entertainment</SelectItem>
              <SelectItem value='Bills'>Bills</SelectItem>
              <SelectItem value='Groceries'>Groceries</SelectItem>
              <SelectItem value='Dining Out'>Dining Out</SelectItem>
              <SelectItem value='Transportation'>Transportation</SelectItem>
              <SelectItem value='Personal Care'>Personal Care</SelectItem>
              <SelectItem value='Education'>Education</SelectItem>
              <SelectItem value='Lifestyle'>Lifestyle</SelectItem>
              <SelectItem value='Shopping'>Shopping</SelectItem>
              <SelectItem value='general'>General</SelectItem>
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
              <Image src={transaction.avatar} alt={transaction.name} width={40} height={40} className='rounded-full' />
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
              <p className='text-xs text-gray-500'>
                {new Date(transaction.date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* paginacja */}
      <Pagination>
        <PaginationContent className='flex w-full justify-between'>
          {/* Poprzednia strona */}
          <PaginationItem>
            <PaginationPrevious className='border-2' onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} />
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
  )
}
