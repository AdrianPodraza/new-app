'use client'

import * as React from 'react'
import { ChevronRight } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, Label, ResponsiveContainer } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import type { ChartConfig } from '@/components/ui/chart'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'

interface BudgetItem {
  category: string
  maximum: number
  theme: string
}

interface Props {
  colStart?: number
  colSpan?: number
  rowSpan?: number
  detailed?: boolean
  budgets: BudgetItem[]
}

export default function Budgets({ colStart, colSpan, rowSpan, budgets, detailed }: Props) {
  const total = useMemo(() => budgets?.reduce((sum, entry) => sum + entry.maximum, 0), [budgets])

  const chartConfig = useMemo(() => {
    const base: ChartConfig = {
      value: { label: 'Amount' },
    }
    budgets?.forEach((b) => {
      base[b.category] = { label: b.category, color: b.theme }
    })
    return base
  }, [budgets])

  return (
    <Card
      className={cn(
        `col-span-1 flex h-full max-h-[500px] flex-col border-none shadow-none`,
        `col-span-${colSpan} col-start-${colStart} row-span-${rowSpan}`,
      )}
    >
      <CardHeader className='flex items-center justify-between pb-0'>
        <CardTitle className='text-grey-900 text-[20px] font-bold'>Budgets</CardTitle>
        {detailed && (
          <button className='text-gray-500'>
            <a className='flex gap-1' href='./budgets'>
              <span>See Details</span>
              <ChevronRight />
            </a>
          </button>
        )}
      </CardHeader>

      <CardContent className='flex flex-row items-center justify-between gap-6 pb-0 xl:flex-1'>
        {/* Wykres z kwotą w środku */}
        <div className='aspect-square xl:flex-1'>
          <ResponsiveContainer width='100%' height='100%'>
            <ChartContainer config={chartConfig} className='aspect-square'>
              <PieChart>
                <Tooltip content={<ChartTooltipContent />} />
                <Pie
                  data={budgets}
                  dataKey='maximum'
                  nameKey='category'
                  cx='50%'
                  cy='50%'
                  innerRadius='40%'
                  outerRadius='60%'
                >
                  {budgets.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.theme} />
                  ))}
                  <Label
                    content={({ viewBox }) => {
                      const { cx, cy } = viewBox
                      return (
                        <text x={cx} y={cy} textAnchor='middle' dominantBaseline='middle'>
                          <tspan x={cx} y={cy} className='fill-foreground text-2xl font-bold'>
                            ${total}
                          </tspan>
                          <tspan x={cx} y={cy + 20} className='fill-muted-foreground text-sm'>
                            limit
                          </tspan>
                        </text>
                      )
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>

        {/* Legenda */}
        <div className='grid grid-cols-1 gap-2 xl:flex-1'>
          {budgets?.map((entry, idx) => (
            <div key={idx} className='flex items-center gap-2'>
              <span className='h-11 w-1 rounded' style={{ background: entry.theme }} />
              <div className='flex flex-col justify-between rounded-lg'>
                <h4 className='text-grey-500 text-xs'>{entry.category}</h4>
                <p className='text-grey-900 text-[14px] font-bold'>${entry.maximum}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
