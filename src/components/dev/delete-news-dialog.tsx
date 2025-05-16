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
import { DropdownMenuItem } from "../ui/dropdown-menu"
import { toast } from "sonner"
import { useState } from "react"

export function DeleteNewsDialog({ title }: { title: string }) {

  const [open, setOpen] = useState(false)

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault()
          setOpen(true)
        }}
        className="w-full"
      >
        Delete
      </DropdownMenuItem>

      <AlertDialog open={open} onOpenChange={setOpen}>
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
            <AlertDialogAction
              onClick={() => {
                toast.info("News has been deleted", {
                  description: "The news have been permanently removed.",
                })
                setOpen(false)
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}