import { deleteReview } from "@/api/review-api"
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

export function DeleteReviewsDialog({ id, open, onOpenChange, username, title }: { id: string, open: boolean, onOpenChange: (open: boolean) => void, username: string, title: string }) {

  const [loading, setLoading] = useState(false)

  async function onDeleteReview() {
    setLoading(true)

    try {
      await deleteReview(id)
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
            Are you sure to delete this review by {username} on {title}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action is permanent and cannot be undone. Once deleted, this review cannot be recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDeleteReview} disabled={loading}>
            {loading && <LoadingIcon />}
            {loading ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}