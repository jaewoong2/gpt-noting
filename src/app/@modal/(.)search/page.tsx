'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from '@/components/ui/form'
import SearchIcon from '@/components/ui/icons/SearchIcon'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { useSearchPosts } from '@/apis/services/post/usePostService'
import useDebounceCallback from '@/hooks/useDebounceCallback'
import Image from 'next/image'
import Link from 'next/link'
import { getRelativeTime } from '@/lib/time'
import useModal from '../hooks/useModal'

const FormSchema = z.object({
  query: z.string().min(2, {
    message: 'query must be at least 2 characters.',
  }),
})

function SearchModalPage() {
  const { isOpen, dismiss } = useModal({ isModal: true })
  const [query, setQuery] = useState('')
  const debounceSetQuery = useDebounceCallback(setQuery, 500)
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      query: '',
    },
  })

  const { data } = useSearchPosts(query, {
    enabled: !!query,
  })

  useEffect(() => {
    form.control.register('query', {
      onChange(event) {
        debounceSetQuery(event.target.value)
      },
    })
  }, [debounceSetQuery, form.control])

  return (
    <Dialog
      modal
      open={isOpen ?? true}
      onOpenChange={(currOpen) => {
        if (!currOpen) {
          dismiss()
        }
      }}
    >
      <DialogContent overlay className="top-[80px] z-[10000001] translate-y-0">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-2">
              <SearchIcon className="stroke-zinc-600" strokeWidth={2} />
              <p>검색 🤖</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex w-full items-center justify-end gap-2">
          <Form {...form}>
            <form
              className="w-full border-b pb-6"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        className="py-6 text-base"
                        placeholder="저장된 응답을 검색해보세요"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <div className="max-h-[450px] overflow-y-auto">
          {data?.data?.map(({ id, title, user, snippet, createdAt }) => (
            <div>
              <div className="flex items-center gap-2 px-2">
                <Image
                  width={40}
                  height={40}
                  src={user?.avatar ?? ''}
                  alt={user?.id ?? ''}
                  className="rounded-full border bg-white"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-xs">{user?.userName}</p>
                  <p className="text-xs text-muted-foreground">
                    {getRelativeTime(createdAt)}
                  </p>
                </div>
              </div>
              <Link
                href={`/post/${id}`}
                key={id}
                className="my-2 flex items-center gap-2 rounded-xl bg-slate-100 p-3 hover:bg-slate-200"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col">
                    <div className="text-sm font-semibold">{title}</div>
                  </div>
                  <div className="text-sm">{snippet}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SearchModalPage
