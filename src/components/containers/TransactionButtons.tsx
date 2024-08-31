'use client'

import React, { useEffect, useState } from 'react'
import {
  useDeletePost,
  useUpdatePost,
} from '@/apis/services/post/usePostService'
import { useLikePost, useUnLikePost } from '@/apis/services/like/useLikeService'
import { cn } from '@/lib/utils'
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
  const [isPublic, setIsPublic] = useState(is_public)
  const [isLike, setIsLike] = useState(false)
  const [open, setOpen] = useState(false)

  const { mutate: likePost } = useLikePost()
  const { mutate: unlikePost } = useUnLikePost()

  const { userId: loggedInUserId, likes: userLikes } = useAuthContext()
  const { mutate: deletePostMutation } = useDeletePost()
  const { mutate: updatePostMutation } = useUpdatePost()

  const { toast } = useToast()

  const handleDelete = () => {
    deletePostMutation(postId, {
      onSuccess() {
        toast({ title: 'AI 응답을 삭제완료 하였습니다.' })
      },
      onSettled() {
        setOpen(false)
      },
    })
  }

  const handleTogglePublic = () => {
    const newIsPublic = !isPublic
    setIsPublic(newIsPublic)
    updatePostMutation({ id: postId, is_public: newIsPublic })
  }

  const handleLikeToggle = () => {
    if (isLike) {
      unlikePost(postId, { onSuccess: () => setIsLike(false) })
    } else {
      likePost(postId, { onSuccess: () => setIsLike(true) })
    }
  }

  useEffect(() => {
    setIsLike(userLikes?.some(({ post }) => post?.id === postId) ?? false)
  }, [userLikes, postId])

  return (
    <>
      {userId === loggedInUserId && (
        <div className="flex w-full items-center justify-end gap-2">
          <button
            type="button"
            className="group flex items-center"
            onClick={handleTogglePublic}
          >
            {isPublic ? (
              <UnLockIcon
                strokeWidth={2}
                className="stroke-gray-600 transition-colors group-hover:stroke-blue-500 dark:stroke-white"
              />
            ) : (
              <LockIcon
                strokeWidth={2}
                className="stroke-gray-600 transition-colors group-hover:stroke-blue-500 dark:stroke-white"
              />
            )}
          </button>
          <Dialog open={open}>
            <DialogTrigger className="group flex items-center">
              <TrashIcon
                onClick={() => setOpen(true)}
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
                  onClick={handleDelete}
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
      <button type="button" className="group" onClick={handleLikeToggle}>
        <HeartIcon
          className={cn('stroke-gray-600 transition-colors dark:stroke-white', {
            'group-hover:fill-red-400': !isLike,
            'fill-red-400 group-hover:fill-transparent': isLike,
          })}
          strokeWidth={2}
        />
      </button>
    </>
  )
}

export default TransactionButtons
