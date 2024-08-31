'use client'

import { NextPageProps } from '@/lib/type'
import Modal from '../../components/Modal'


function ViewPost({ params }: NextPageProps<{ postId: string }>) {


  return (
    <Modal postId={params.postId}>
      <Modal.Wrapper className="relative mt-14 items-start border">
        <Modal.Header className="m-0 justify-start border-b p-4 max-sm:px-2" />
        <Modal.TitleForm className="w-full px-10 pt-8 text-2xl font-semibold max-sm:px-4" />
        <Modal.TransactionButtons className="absolute bottom-[100%] px-0 [&_svg]:!stroke-white" />
        <Modal.Description className="min-h-[450px] max-sm:px-2" descriptionClassName='max-sm:!px-2' />
        <Modal.Bottom className="" />
      </Modal.Wrapper>
    </Modal>
    );
}

export default ViewPost
