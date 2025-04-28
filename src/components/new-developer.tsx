import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { Gamepad2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Checkbox } from "./ui/checkbox"
import { TermsConditionsDeveloperDialogueContent } from "./terms-conditions-developer-dialog-content"
import { Textarea } from "./ui/textarea"

const DeveloperFormSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  description: z.string().min(1, "Description cannot be empty"),
  terms: z.boolean().default(false),
})
  .refine(({ terms }) => terms === true, {
    message: "You must accept the terms and conditions",
    path: ["terms"],
  })

export function NewDeveloper() {

  const developerForm = useForm<z.infer<typeof DeveloperFormSchema>>({
    resolver: zodResolver(DeveloperFormSchema),
    defaultValues: {
      name: "",
      description: "",
      terms: false,
    }
  })

  function onDeveloperSubmit(data: z.infer<typeof DeveloperFormSchema>) {
    console.log(JSON.stringify(data, null, 2))
    window.open("/developer", "_blank")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><Gamepad2 /><span className="hidden sm:flex">Become a Game Developer</span></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Become a Game Developer</DialogTitle>
          <DialogDescription>
            Fill out the details below to become a game developer.
          </DialogDescription>
        </DialogHeader>
        <Form {...developerForm}>
          <form onSubmit={developerForm.handleSubmit(onDeveloperSubmit)} className="space-y-4 flex flex-col">
            <FormField
              control={developerForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Developer Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={developerForm.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={developerForm.control}
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
                        <span className="underline text-primary cursor-pointer text-sm font-bold"> Developer Terms & Conditions</span>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <TermsConditionsDeveloperDialogueContent />
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button onClick={() => {
                              developerForm.setValue("terms", true)
                              developerForm.trigger("terms")
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
            <Button type="submit" className="mt-1">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
