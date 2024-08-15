'use client'

import Modal from '@/app/@modal/components/Modal'
import { NextPageProps } from '@/lib/type'

// const Modal = dynamic(() => import('@/app/@modal/components/Modal'), {
//   loading: () => <div>로딩중</div>,
//   ssr: true,
// })

function ViewPost({ params }: NextPageProps<{ postId: string }>) {
  return (
    <Modal postId={params.postId} isModal={false}>
      <Modal.Wrapper className="m-4 h-full max-h-full w-full max-w-full bg-white shadow-lg">
        <Modal.Header className="justify-start border-b p-4">
          <Modal.TitleForm className="w-fit text-xl" />
        </Modal.Header>
        <Modal.Description className="h-full max-h-full overflow-y-visible py-0" />
      </Modal.Wrapper>
    </Modal>
  )
}

export default ViewPost
