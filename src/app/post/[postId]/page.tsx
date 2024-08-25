'use client'

import Modal from '@/app/@modal/components/Modal'
import { NextPageProps } from '@/lib/type'

function ViewPost({ params }: NextPageProps<{ postId: string }>) {
  return (
    <Modal postId={params.postId} isModal={false}>
      <Modal.Wrapper className="m-4 h-full max-h-full w-full max-w-2xl bg-transparent shadow-none dark:bg-transparent">
        <Modal.Header className="w-full justify-start border-b p-4">
          <Modal.TitleForm className="w-full text-2xl" />
        </Modal.Header>
        <Modal.TransactionButtons className="" />
        <Modal.Description
          className="h-full max-h-full overflow-y-visible bg-transparent py-4"
          descriptionClassName="!bg-transparent"
        />
      </Modal.Wrapper>
    </Modal>
  )
}

export default ViewPost
