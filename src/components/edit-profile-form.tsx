import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
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

const EditProfileFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  dob: z.date({
    required_error: "A date of birth is required",
  }).refine((date) => {
    const today = new Date();
    const minDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
    return date <= minDate;
  }, { 
    message: "You must be at least 13 years old",
  }),
  })

export function EditProfileForm(){

  const editProfileForm = useForm<z.infer<typeof EditProfileFormSchema>>({
    resolver: zodResolver(EditProfileFormSchema),
      defaultValues: {
        username: "Username",
        dob: new Date(1325350800 * 1000),
      }
    })
  
    function onEditProfileSubmit(data: z.infer<typeof EditProfileFormSchema>) {
      const formattedData = {
        ...data,
        dob: Math.floor(new Date(data.dob).getTime() / 1000)
      }
      console.log(JSON.stringify(formattedData, null, 2))
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button><Pencil />Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
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
            <Button type="submit" className="mt-1">Save</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}