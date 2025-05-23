import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarDOB } from "./calender-dob"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/auth-context"
import { useState } from "react"
import { LoadingIcon } from "./loading-icon"
import { updateUser } from "@/api/user-api"
import { toast } from "sonner"

const EditProfileFormSchema = z.object({
  username: z
    .string()
    .min(3, "Name must be between 3 and 100 characters long.")
    .max(100, "Name must be between 3 and 100 characters long.")
    .regex(/^[a-zA-Z0-9 ]+$/, "Name can only contain letters, numbers, and spaces."),
  dob: z.date({
    required_error: "A date of birth is required",
  }).refine((date) => {
    const today = new Date()
    const minDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate())
    return date <= minDate
  }, {
    message: "You must be at least 13 years old",
  }),
})

export function EditProfileForm() {

  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const editProfileForm = useForm<z.infer<typeof EditProfileFormSchema>>({
    resolver: zodResolver(EditProfileFormSchema),
    defaultValues: {
      username: user?.name,
      dob: new Date(Number(user!.birthDate) * 1000),
    }
  })

  async function onEditProfileSubmit(data: z.infer<typeof EditProfileFormSchema>) {
    setLoading(true)

    const formattedData = {
      name: data.username,
      birthDate: Math.floor(new Date(data.dob).getTime() / 1000).toString()
    }

    try {
      await updateUser(formattedData)
      window.location.reload()
    } catch (err: any) {
      toast.error(err.message || "Update failed. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => editProfileForm.reset({
          username: user?.name,
          dob: new Date(Number(user!.birthDate) * 1000),
        })}><Pencil />Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...editProfileForm}>
          <form onSubmit={editProfileForm.handleSubmit(onEditProfileSubmit)} className="space-y-4 flex flex-col">
            <FormField
              control={editProfileForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={editProfileForm.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value && format(field.value, "PPP")}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarDOB
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-1" disabled={loading}>
              {loading && <LoadingIcon />}
              {loading ? "Saving..." : "Save"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}