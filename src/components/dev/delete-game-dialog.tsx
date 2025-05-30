import { deleteGames } from "@/api/game-api"
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

export function DeleteGameDialog({ id, open, onOpenChange, title }: { id: string, open: boolean, onOpenChange: (open: boolean) => void, title: string }) {

  const [loading, setLoading] = useState(false)

  async function onDeleteGames() {
    setLoading(true)

    try {
      await deleteGames(id)
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
          <AlertDialogTitle>Are you sure to delete {title}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action is permanent and cannot be undone. Once deleted, the game and its data cannot be recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDeleteGames} disabled={loading}>
            {loading && <LoadingIcon />}
            {loading ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
