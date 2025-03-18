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
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { ScrollArea } from "./ui/scroll-area"

const RegisterFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  terms: z.boolean().default(false),
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
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine(({ terms }) => terms === true, {
    message: "You must accept the terms and conditions",
    path: ["terms"],
  })

export function RegisterForm(){

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

  function onRegisterSubmit(data: z.infer<typeof RegisterFormSchema>) {
    const formattedData = {
      ...data,
      dob: Math.floor(new Date(data.dob).getTime() / 1000)
    }
    console.log(JSON.stringify(formattedData, null, 2))
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
          <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
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
                          <DialogHeader>
                            <DialogTitle>Terms & Conditions</DialogTitle>
                            <DialogDescription>
                              Indiego's Terms & Conditions
                            </DialogDescription>
                          </DialogHeader>
                          <ScrollArea className="h-[400px] rounded-md border p-4">
                            <h2 className="text-lg font-bold">Welcome to Indiego</h2>
                            <p>Indiego is a platform where users can browse and play games published by indie developers.</p>
                            <h3 className="font-semibold mt-4">1. Age Requirement</h3>
                            <p>You must be at least 13 years old to create an account.</p>
                            <h3 className="font-semibold mt-4">2. Subscriptions</h3>
                            <p>Users can purchase a subscription to receive a personalized recommendation bundle of games every week.</p>
                            <h3 className="font-semibold mt-4">3. User Responsibilities</h3>
                            <p>Users must comply with community guidelines and respect the developers.</p>
                            <h3 className="font-semibold mt-4">4. Payment & Refunds</h3>
                            <p>Subscriptions are refundable, subject to certain conditions and eligibility criteria.</p>
                          </ScrollArea>
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
            <Button type="submit">Register</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}