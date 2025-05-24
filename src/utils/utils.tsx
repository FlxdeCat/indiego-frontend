export function convertDate(unix: string): string {
  if (unix == "") return "Error: Invalid Date"
  return (new Date(Number(unix) * 1000)).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

export function smoothScroll(element: HTMLElement, target: number, duration: number) {
  const start = element.scrollLeft
  const startTime = performance.now()

  function scrollStep(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const ease = progress * (2 - progress)

    element.scrollLeft = start + (target - start) * ease

    if (progress < 1) {
      requestAnimationFrame(scrollStep)
    }
  }

  requestAnimationFrame(scrollStep)
}

export function formatThousand(amount: number): string {
  return new Intl.NumberFormat("en-US").format(amount)
}

export const paginationNumbers = (totalPages: number, currentPage: number) => {
  const maxVisible = 5
  const pages: (number | "...")[] = []

  if (totalPages <= maxVisible + 2) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else {
    pages.push(1)

    if (currentPage > 3) {
      pages.push("...")
    }

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)
    for (let i = start; i <= end; i++) pages.push(i)

    if (currentPage < totalPages - 2) {
      pages.push("...")
    }

    pages.push(totalPages)
  }

  return pages
}