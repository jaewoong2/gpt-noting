'use client'
import React from 'react'
import { Button } from '../ui/button'
import HeartIcon from '../ui/icons/HeartIcon'
import { useAuthContext } from '../providers/AuthContextProvider'
import { Switch } from '../ui/switch'
import { useDeletePost } from '@/apis/services/post/usePostService'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { useToast } from '../ui/use-toast'

type Props = {
  userId?: string
  postId: string
  is_public: boolean
}

const TransactionButtons = ({ userId, postId, is_public }: Props) => {
  const loginUser = useAuthContext()
  const { mutate } = useDeletePost()
  const { toast } = useToast()

  const onClickDeleteButton = () => {
    mutate(postId, {
      onSuccess() {
        toast({
          title: 'AI 응답을 삭제완료 하였습니다.',
        })
      },
    })
  }

  return (
    <>
      {userId === loginUser.userId && (
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2 text-xs">
            {is_public ? '공개' : '비공개'}
            <Switch checked={is_public} />
          </div>
          <Dialog>
            <DialogTrigger>
              <Button
                type="button"
                variant="outline"
                size={'sm'}
                className="text-xs"
              >
                삭제하기
              </Button>
            </DialogTrigger>
            <DialogContent>
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
                  variant={'destructive'}
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
          className="stroke-gray-600 transition-colors group-hover:fill-red-400 dark:stroke-white"
          strokeWidth={2}
        />
      </button>
    </>
  )
}

export default TransactionButtons
