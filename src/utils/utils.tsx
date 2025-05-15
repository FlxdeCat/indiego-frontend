export function convertDate(unix: string): string {
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