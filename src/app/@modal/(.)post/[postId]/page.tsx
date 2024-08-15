'use client'

import { NextPageProps } from '@/lib/type'
import Modal from '../../components/Modal'

function ViewPost({ params }: NextPageProps<{ postId: string }>) {
  return (
    <Modal postId={params.postId}>
      <Modal.Wrapper className="h-full">
        <Modal.Header className="justify-start border-b p-4">
          <Modal.TitleForm className="w-fit text-xl" />
        </Modal.Header>
        <Modal.Description className="h-full max-h-[610px] border-b" />
      </Modal.Wrapper>
      <Modal.Overlay />
    </Modal>
  )
}

export default ViewPost
