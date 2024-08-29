'use client'

import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import Description from '@/components/containers/Description'
import { GetPostDetailResponse } from '@/apis/services/post/type'
import { useGetPostDetail } from '@/apis/services/post/usePostService'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import TransactionButtons from '@/components/containers/TransactionButtons'
import Image from 'next/image'
import { getRelativeTime, getYYYYMMDD } from '@/lib/time'
import TooltipContainer from '@/components/ui/tooltip-container'
import useModal from '../../hooks/useModal'

type Props = {
  isModal?: boolean
  postId?: string
}

type ModalContextType = {
  dismiss: () => void
  isOpen: boolean | null
  post: GetPostDetailResponse | undefined
  isModal?: boolean
  postId?: string
}

const ModalContext = createContext<ModalContextType | null>(null)

const useModalContext = () => {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('Needs Modal Context Provider')
  }

  return context
}

function Modal({ postId, children, isModal = true }: PropsWithChildren<Props>) {
  const { dismiss, isOpen } = useModal({ isModal })
  const [mounted, setMounted] = useState(false)

  const post = useGetPostDetail(postId ?? '', {
    enabled: typeof postId !== undefined,
  })

  const value = useMemo(
    () => ({
      dismiss,
      isOpen,
      post: post.data,
      isModal,
      postId,
    }),
    [dismiss, isOpen, post.data, postId, isModal],
  )

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return
  }

  // eslint-disable-next-line consistent-return
  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

function ModalWrapper({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const { dismiss, isOpen, isModal } = useModalContext()

  return (
    <div
      className={
        isModal
          ? cn(
              'fixed left-0 top-0 z-[1001] h-screen w-screen overflow-auto bg-[#000000a4] py-10',
              'max-md:px-6',
            )
          : ''
      }
      onClick={dismiss}
    >
      <div className="relative z-[11] flex items-center justify-center">
        <div
          className={cn(
            'animate-fade-in min-h-[600px] w-full max-w-3xl rounded-xl bg-white shadow-xl dark:bg-[#1f1f1f]',
            !isOpen && 'animate-fade-out',
            'max-sm:size-full',
            'relative',
            className,
          )}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          {children}
        </div>
      </div>
      {isModal && <ModalOverlay />}
    </div>
  )
}

function ModalBottom({ className, ...props }: JSX.IntrinsicElements['div']) {
  const { postId } = useModalContext()

  if (!postId) {
    throw new Error("Need It's Post Id")
  }

  return (
    <div
      className={cn('relative rounded-b-xl border-t py-4', className)}
      {...props}
    />
  )
}

function ModalDescription({
  className,
  children,
  descriptionClassName,
  ...props
}: JSX.IntrinsicElements['div'] & { descriptionClassName?: string }) {
  const { post } = useModalContext()

  return (
    <div className={cn('w-full p-6 text-base', className)} {...props}>
      <div className="px-4 text-sm text-muted-foreground">
        {getYYYYMMDD(post?.data.createdAt ?? '')}
      </div>
      <Description
        className={cn('w-full dark:bg-[#1f1f1f]', descriptionClassName)}
      >
        {post?.data.description}
      </Description>
      {children}
    </div>
  )
}

function ModalTitleForm({ className, ...props }: JSX.IntrinsicElements['div']) {
  const { post } = useModalContext()

  return (
    <div className={cn('w-full', className)} {...props}>
      <h1>{post?.data.title}</h1>
      {post?.data.tags?.map((tag) => (
        <Badge className="w-fit text-xs" variant="secondary" key={tag.id}>
          <Link href={`?tag=${tag.name}`}>{tag.name}</Link>
        </Badge>
      ))}
    </div>
  )
}

function ModalHeader({
  className,
  children,
  ...props
}: JSX.IntrinsicElements['div']) {
  const { dismiss, isModal, post } = useModalContext()
  // const loginUser = useAuthContext()

  return (
    <div
      className={cn(
        'flex h-fit w-full flex-col items-center justify-between px-2 pt-2',
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-center justify-start gap-2 px-6 py-2">
        <div className="flex w-full items-center gap-2">
          <Image
            className="rounded-full border bg-white"
            src={post?.data.user?.avatar ?? ''}
            alt={post?.data.user?.userName ?? ''}
            width={40}
            height={40}
          />
          <div>
            <p className="text-sm">{post?.data.user?.userName}</p>
            <p className="text-xs text-muted-foreground">
              {getRelativeTime(post?.data.createdAt ?? '')}
            </p>
          </div>
        </div>
        {isModal && (
          <TooltipContainer content={<p className="px-2 text-xs">닫기</p>}>
            <Button
              variant="ghost"
              className="text-base text-muted-foreground"
              onClick={dismiss}
            >
              &times;
            </Button>
          </TooltipContainer>
        )}
      </div>
      <div className="w-full px-3">
        <div className="px-4">{children}</div>
      </div>
    </div>
  )
}

function ModalTransactionButtons({
  className,
  ...props
}: JSX.IntrinsicElements['div']) {
  const { post } = useModalContext()

  if (!post) {
    return null
  }

  return (
    <div className={cn('w-full px-3', className)} {...props}>
      <div className="flex w-full items-center justify-end gap-2 py-3">
        <TransactionButtons
          postId={post?.data.id}
          is_public={post?.data.is_public ?? true}
          userId={post?.data.user?.id}
        />
      </div>
    </div>
  )
}

function ModalOverlay() {
  return (
    <div
      id="overlay"
      className="absolute left-0 top-0 z-[1001] w-full bg-[#00000050]"
    />
  )
}

Modal.Wrapper = ModalWrapper
Modal.Bottom = ModalBottom
Modal.Description = ModalDescription
Modal.TitleForm = ModalTitleForm
Modal.Header = ModalHeader
Modal.Overlay = ModalOverlay
Modal.TransactionButtons = ModalTransactionButtons

export default Modal
