import React, { PropsWithChildren } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip'

type Props = {
  content: React.ReactNode
}

function TooltipContainer({ children, content }: PropsWithChildren<Props>) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={400}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="px-2 py-2 text-xs text-muted-foreground">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipContainer
