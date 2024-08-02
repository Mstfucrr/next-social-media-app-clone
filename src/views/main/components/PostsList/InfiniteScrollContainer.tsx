import { useInView } from 'react-intersection-observer'

interface IIInfiniteScrollContainerProps extends React.PropsWithChildren {
  onBottomReached: () => void
  className?: string
}

export default function InfiniteScrollContainer({
  children,
  onBottomReached,
  className
}: IIInfiniteScrollContainerProps) {
  const { ref } = useInView({
    rootMargin: '200px',
    onChange(inView) {
      if (inView) {
        onBottomReached()
      }
    }
  })

  return (
    <div className={className}>
      {children}
      <div ref={ref} />
    </div>
  )
}
