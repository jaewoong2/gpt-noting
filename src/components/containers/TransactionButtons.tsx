'use client'

import React, { useState } from 'react'
import {
  useDeletePost,
  useUpdatePost,
} from '@/apis/services/post/usePostService'
import { useLikePost, useUnLikePost } from '@/apis/services/like/useLikeService'
import { cn } from '@/lib/utils'
import { useUserGetMe } from '@/apis/services/user/useUserService'
import { Button } from '../ui/button'
import HeartIcon from '../ui/icons/HeartIcon'
import { useAuthContext } from '../providers/AuthContextProvider'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { useToast } from '../ui/use-toast'
import TrashIcon from '../ui/icons/TrashIcon'
import LockIcon from '../ui/icons/LockIcon'
import UnLockIcon from '../ui/icons/UnLockIcon'

type Props = {
  userId?: string
  postId: string
  is_public: boolean
}

function TransactionButtons({ userId, postId, is_public }: Props) {
  const [IsPublic, setIsPublic] = useState(is_public)
  const likes = useLikePost()
  const unlikes = useUnLikePost()
  const loginUser = useAuthContext()
  const user = useUserGetMe({ gcTime: Infinity })
  const deletePost = useDeletePost()
  const updatePost = useUpdatePost()
  const { toast } = useToast()

  const onClickDeleteButton = () => {
    deletePost.mutate(postId, {
      onSuccess() {
        toast({
          title: 'AI 응답을 삭제완료 하였습니다.',
        })
      },
    })
  }

  const onTogglePublicButton = () => {
    setIsPublic((prev) => !prev)
    updatePost.mutate({ id: postId, is_public: !is_public })
  }

  const isLike = user.data?.data?.likes.findIndex(
    ({ post }) => post?.id === postId,
  )

  const onClickLikeButton = () => {
    if (isLike) {
      unlikes.mutate(postId)
      return
    }
    likes.mutate(postId)
  }

  return (
    <>
      {userId === loginUser.userId && (
        <div className="flex w-full items-center justify-end gap-2">
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              className="group flex items-center"
              onClick={onTogglePublicButton}
            >
              {!IsPublic ? (
                <LockIcon
                  strokeWidth={2}
                  className="stroke-gray-600 transition-colors group-hover:stroke-blue-500 dark:stroke-white"
                />
              ) : (
                <UnLockIcon
                  strokeWidth={2}
                  className="stroke-gray-600 transition-colors group-hover:stroke-blue-500 dark:stroke-white"
                />
              )}
            </button>
          </div>
          <Dialog>
            <DialogTrigger className="group flex items-center">
              <TrashIcon
                strokeWidth={2}
                className="stroke-gray-600 transition-colors group-hover:fill-gray-400 dark:stroke-white"
              />
            </DialogTrigger>
            <DialogContent overlay={false} className="z-[10000001]">
              <DialogHeader>
                <DialogTitle>저장한 AI 응답을 삭제 하시겠습니까?</DialogTitle>
                <DialogDescription>
                  실제 응답은 삭제되지 않습니다. 언제든지 다시 저장하세요 😎
                </DialogDescription>
              </DialogHeader>
              <div className="flex w-full items-center justify-end gap-2">
                <Button className="px-6">취소</Button>
                <Button
                  onClick={onClickDeleteButton}
                  className="px-6"
                  variant="destructive"
                >
                  삭제
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
      <button type="button" className="group">
        <HeartIcon
          onClick={onClickLikeButton}
          className={cn(
            'stroke-gray-600 transition-colors dark:stroke-white',
            !isLike && 'group-hover:fill-red-400',
            isLike && 'fill-red-400 group-hover:fill-transparent',
          )}
          strokeWidth={2}
        />
      </button>
    </>
  )
}

export default TransactionButtons
