import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DropdownMenuItem } from "../ui/dropdown-menu"
import { toast } from "sonner"

export function DeleteNewsDialog({ title }: { title: string }) {
  return (
    <AlertDialog>
      <DropdownMenuItem
        onSelect={(e) => e.preventDefault()}
        asChild
        className="w-full"
      >
        <AlertDialogTrigger>
          Delete
        </AlertDialogTrigger>
      </DropdownMenuItem>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure to delete the news: {title}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action is permanent and cannot be undone. Once deleted, this news cannot be recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() =>
            toast.info("News has been deleted", {
              description: "The news have been permanently removed.",
            })
          }>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}