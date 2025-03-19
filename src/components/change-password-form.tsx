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
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Lock } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const ChangePasswordFormSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export function ChangePasswordForm(){

  const changePasswordForm = useForm<z.infer<typeof ChangePasswordFormSchema>>({
    resolver: zodResolver(ChangePasswordFormSchema),
      defaultValues: {
        password: "",
        confirmPassword: "",
      }
    })
  
    function onChangePasswordFormSubmit(data: z.infer<typeof ChangePasswordFormSchema>) {
      console.log(JSON.stringify(data, null, 2))
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary"><Lock />Change Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <Form {...changePasswordForm}>
          <form onSubmit={changePasswordForm.handleSubmit(onChangePasswordFormSubmit)} className="space-y-4 flex flex-col">
            <FormField
              control={changePasswordForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={changePasswordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm New Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
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