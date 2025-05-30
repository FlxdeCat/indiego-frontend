import { LoadingIcon } from "@/components/loading-icon";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        <LoadingIcon size={50} className="text-primary" />
      </div>
    </div>
  )
}