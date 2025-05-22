import { LoaderCircle } from "lucide-react";

export function LoadingIcon({ size = 15 }: { size?: number }) {
  return (
    <div>
      <LoaderCircle size={size} className="animate-spin" />
    </div>
  )
}
