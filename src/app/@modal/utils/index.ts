/**
 * Extracts image URLs from a Markdown string.
 * @param markdown - The Markdown string to extract image URLs from.
 * @returns An array of image URLs.
 */
export function extractImageUrls(markdown: string): string[] {
  const imageUrls: string[] = []
  const regex = /!\[.*?\]\((.*?)\)/g
  let match: RegExpExecArray | null

  while ((match = regex.exec(markdown)) !== null) {
    imageUrls.push(match[1])
  }

  return imageUrls
}

export function loadImageWithRetry(url: string, retries: number = 1) {
  return new Promise((resolve) => {
    const maxRetries = 30

    const img = new Image()
    img.src = url

    if (maxRetries === retries) {
      resolve(false)
    }

    img.onerror = () => {
      console.warn(`Image load failed. Retrying... (${retries}/${maxRetries})`)
      setTimeout(() => {
        if (retries === maxRetries) return
        resolve(loadImageWithRetry(url, retries + 1))
      }, 1000) // 1초 후에 재시도
    }

    img.onload = () => {
      resolve(true)
    }
  })
}

export function findClosestParentWithDataId(
  element: HTMLElement
): HTMLElement | null {
  let currentElement: HTMLElement | null = element

  while (currentElement) {
    if (currentElement.hasAttribute("data-id")) {
      return currentElement
    }
    currentElement = currentElement.parentElement
  }

  return null
}

export function isImageFile(event: React.DragEvent) {
  const dataTransfer = event.dataTransfer
  if (!dataTransfer) {
    return false
  }

  const files = dataTransfer.files
  if (files.length === 0) {
    console.log("No files dropped.")
    return false
  }

  // Check if the dropped file is an image
  const file = files[0]
  if (!file.type.startsWith("image/")) {
    console.log("Dropped file is not an image.")
    return false
  }

  return true
}

export function getDroppedDataId(event: React.DragEvent) {
  event.preventDefault()

  // Get the element where the drop occurred
  const droppedElement = event.target as HTMLElement

  // Find the closest parent with the 'data-id' attribute
  const closestParentWithDataId = findClosestParentWithDataId(droppedElement)

  if (closestParentWithDataId) {
    return closestParentWithDataId.getAttribute("data-id")
  } else {
    return null
  }
}
