'use client'

import React, { PropsWithChildren } from 'react'
import MarkdownPreview, {
  MarkdownPreviewProps,
} from '@uiw/react-markdown-preview'
import { useTheme } from 'next-themes'

type Props = Omit<MarkdownPreviewProps, 'source'>

function Description({
  className,
  style,
  children,
  ...props
}: PropsWithChildren<Props>) {
  const { theme } = useTheme()

  return theme ? (
    <MarkdownPreview
      source={children?.toString()}
      className={className}
      style={{ padding: 16, ...style }}
      wrapperElement={{
        'data-color-mode': theme === 'light' ? 'light' : 'dark',
      }}
      {...props}
    />
  ) : null
}

export default Description
