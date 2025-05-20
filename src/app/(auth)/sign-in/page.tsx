'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

function SignIn() {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    password: z.string().min(6, {
      message: 'Password must be at least 6 characters.',
    }),
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = (data: { username: string; password: string }) => {
    console.log(data)
    // Tutaj można dodać logikę logowania
  }

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-md'
        >
          <h3 className='text-[32px] font-bold'>Login</h3>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-grey-500 text-xs font-bold'>Email</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-grey-500 text-xs font-bold'>Password</FormLabel>
                <FormControl>
                  <Input placeholder='shadcn' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='w-full cursor-pointer'>
            Login
          </Button>
          <p className='text-grey-500 text-center text-xs'>
            Don&apos;t have an account?
            <a href='/sign-up' className='ml-1 font-bold text-gray-900 underline'>
              Sign Up
            </a>
          </p>
        </form>
      </Form>
    </div>
  )
}

export default SignIn
