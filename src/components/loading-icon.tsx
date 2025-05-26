import { LoaderCircle } from "lucide-react";

export function LoadingIcon({ size = 15, className }: { size?: number, className?: string }) {
  return (
    <div className={className}>
      <LoaderCircle size={size} className="animate-spin" />
    </div>
  )
}
