'use client'

import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { ArrowLeft } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import Description from '@/components/containers/Description'
import { GetPostDetailResponse } from '@/apis/services/post/type'
import { useGetPostDetail } from '@/apis/services/post/usePostService'
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

const modalContext = createContext<ModalContextType | null>(null)

const useModalContext = () => {
  const context = useContext(modalContext)

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

  return <modalContext.Provider value={value}>{children}</modalContext.Provider>
}

function ModalWrapper({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  const { dismiss, isOpen, isModal } = useModalContext()

  return (
    <div
      className={
        isModal ? cn('fixed left-0 top-0 z-[1001] h-screen w-screen') : ''
      }
      onClick={dismiss}
    >
      <div className="relative z-[11] flex size-full items-center justify-center">
        <div
          className={cn(
            'animate-fade-in max-h-[700px] min-h-[600px] w-[672px] max-w-2xl rounded-xl bg-white shadow-xl dark:bg-[#1f1f1f]',
            !isOpen && 'animate-fade-out',
            'max-sm:size-full max-sm:rounded-none',
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
      {/* <ModalOverlay /> */}
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
      className={cn('relative rounded-b-xl border-t py-2', className)}
      {...props}
    />
  )
}

function ModalDescription({
  className,
  children,
  ...props
}: JSX.IntrinsicElements['div'] & {}) {
  const { post } = useModalContext()

  return (
    <div
      className={cn(
        'h-[350px] w-full overflow-y-auto p-6 text-base',
        className,
      )}
      {...props}
    >
      <Description>{post?.data.description}</Description>
      {children}
    </div>
  )
}

function ModalTitleForm({ className, ...props }: JSX.IntrinsicElements['div']) {
  const { post } = useModalContext()

  return (
    <div className={cn('w-full', className)} {...props}>
      <h1>{post?.data.title}</h1>
    </div>
  )
}

function ModalHeader({
  className,
  children,
  ...props
}: JSX.IntrinsicElements['div']) {
  const { dismiss } = useModalContext()
  // const loginUser = useAuthContext()

  return (
    <div
      className={cn(
        'flex h-fit w-full items-center justify-between px-2 pt-2',
        className,
      )}
      {...props}
    >
      <Button variant="ghost" className="text-base" onClick={dismiss}>
        <ArrowLeft />
      </Button>
      <div className="px-4">{children}</div>
    </div>
  )
}

function ModalOverlay() {
  return (
    <div
      id="overlay"
      className="absolute left-0 top-0 z-10 h-screen w-screen bg-[#0000002e]"
    />
  )
}

Modal.Wrapper = ModalWrapper
Modal.Bottom = ModalBottom
Modal.Description = ModalDescription
Modal.TitleForm = ModalTitleForm
Modal.Header = ModalHeader
Modal.Overlay = ModalOverlay

export default Modal
