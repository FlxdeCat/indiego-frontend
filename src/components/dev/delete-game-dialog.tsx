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
import { toast } from "sonner"
import { DropdownMenuItem } from "../ui/dropdown-menu"

export function DeleteGameDialog({ title }: { title: string }) {
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
          <AlertDialogTitle>Are you sure to delete {title}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action is permanent and cannot be undone. Once deleted, the game and its data cannot be recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() =>
            toast.info("Game has been deleted", {
              description: "The game and its data have been permanently removed.",
            })
          }>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
