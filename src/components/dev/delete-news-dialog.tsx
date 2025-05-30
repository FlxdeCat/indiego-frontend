import { deleteNews } from "@/api/news-api"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { toast } from "sonner"
import { LoadingIcon } from "../loading-icon"

export function DeleteNewsDialog({ id, open, onOpenChange, title }: { id: string, open: boolean, onOpenChange: (open: boolean) => void, title: string }) {

  const [loading, setLoading] = useState(false)

  async function onDeleteNews() {
    setLoading(true)

    try {
      await deleteNews(id)
      onOpenChange(false)
      window.location.reload()
    } catch (err: any) {
      toast.error(err.message || "Delete failed. Please try again later.")
    } finally {
      setLoading(false)
      onOpenChange(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure to delete the news: {title}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action is permanent and cannot be undone. Once deleted, this news cannot be recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDeleteNews} disabled={loading}>
            {loading && <LoadingIcon />}
            {loading ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}