import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { CalendarDOB } from "./calender-dob"
import { Checkbox } from "./ui/checkbox"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "./ui/dialog"
import { TermsConditionsDialogueContent } from "./terms-conditions-dialog-content"
import { registerApi } from "@/api/auth-api"
import { toast } from "sonner"
import { LoadingIcon } from "./loading-icon"
import { useState } from "react"

export const RegisterFormSchema = z.object({
  username: z
    .string()
    .min(3, "Name must be between 3 and 100 characters long.")
    .max(100, "Name must be between 3 and 100 characters long.")
    .regex(/^[a-zA-Z0-9 ]+$/, "Name can only contain letters, numbers, and spaces."),
  email: z
    .string()
    .nonempty("Email is required.")
    .email("Invalid email format."),
  password: z
    .string()
    .nonempty("Password is required.")
    .min(8, "Password must be at least 8 characters long.")
    .max(100, "Password must be at most 100 characters long.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(/[\W_]/, "Password must contain at least one special character."),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
    path: ["terms"],
  }),
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
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export function RegisterForm() {

  const [loading, setLoading] = useState(false)

  const registerForm = useForm<z.infer<typeof RegisterFormSchema>>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
      dob: undefined,
    }
  })

  async function onRegisterSubmit(data: z.infer<typeof RegisterFormSchema>) {
    setLoading(true)

    const formattedData = {
      name: data.username,
      email: data.email,
      password: data.password,
      birthDate: Math.floor(new Date(data.dob).getTime() / 1000).toString()
    }

    try {
      await registerApi(formattedData)
      window.location.href = "/auth"
    } catch (err: any) {
      toast.error(err.message || "Registration failed. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Please enter your information to start creating your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...registerForm}>
          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4 flex flex-col">
            <FormField
              control={registerForm.control}
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
              control={registerForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={registerForm.control}
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
            <FormField
              control={registerForm.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="flex items-center space-x-1.5">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="ml-2">
                      I agree to the
                    </FormLabel>
                    <Dialog>
                      <DialogTrigger asChild>
                        <span className="underline text-primary cursor-pointer text-sm font-bold"> Terms & Conditions</span>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <TermsConditionsDialogueContent />
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button onClick={() => {
                              registerForm.setValue("terms", true)
                              registerForm.trigger("terms")
                            }}>Agree</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-1" disabled={loading}>
              {loading && <LoadingIcon />}
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}