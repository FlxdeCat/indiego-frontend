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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Checkbox } from "./ui/checkbox"
import { TermsConditionsDeveloperDialogueContent } from "./terms-conditions-developer-dialog-content"
import { ReactNode, useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { becomeNewDeveloper } from "@/api/developer-api"
import { toast } from "sonner"
import { LoadingIcon } from "./loading-icon"

interface MyComponentProps {
  button: ReactNode
}

const DeveloperFormSchema = z.object({
  name: z.string().min(1, "Name cannot be empty").max(50, "Name must be at most 50 characters long"),
  full_name: z.string().min(1, "Full name cannot be empty").max(100, "Full name must be at most 100 characters long"),
  tax_id: z.string().min(1, "Tax ID cannot be empty").max(20, "Tax ID must be at most 20 characters long"),
  country: z.string().min(1, "Country cannot be empty").max(50, "Country must be at most 50 characters long"),
  terms: z.boolean().default(false),
})
  .refine(({ terms }) => terms === true, {
    message: "You must accept the terms and conditions",
    path: ["terms"],
  })

export function NewDeveloper({ button }: MyComponentProps) {

  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  const developerForm = useForm<z.infer<typeof DeveloperFormSchema>>({
    resolver: zodResolver(DeveloperFormSchema),
    defaultValues: {
      name: "",
      full_name: "",
      tax_id: "",
      country: "",
      terms: false,
    }
  })

  async function onDeveloperSubmit(data: z.infer<typeof DeveloperFormSchema>) {
    setLoading(true)

    const formattedData = {
      devName: data.name,
      fullName: data.full_name,
      taxId: data.tax_id,
      country: data.country
    }

    try {
      await becomeNewDeveloper(formattedData)
      window.open("/developer", "_blank")
      window.location.reload()
    } catch (err: any) {
      if (err.status == 403) toast.error("You've already become a developer.")
      toast.error(err.message || "Registration failed. Please try again later.")
    } finally {
      setLoading(false)
      handleDialogClose()
    }
  }

  interface Country {
    value: string
    label: string
  }

  const [countries, setCountries] = useState<Country[]>([])

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,cca2')
      .then(response => response.json())
      .then(data => {
        const countryList = data.map((country: any) => ({
          value: country.cca2,
          label: country.name.common,
        }))
        setCountries(countryList.sort((a: Country, b: Country) => a.label.localeCompare(b.label)))
      })
  }, [])

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        {button}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
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
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the full name on the PayPal account that matches the email you registered with.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <FormField
                control={developerForm.control}
                name="tax_id"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Tax ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={developerForm.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <div className="w-full">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className={`w-full ${developerForm.formState.errors.country && "!border-red-500"}`}>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent className="max-h-120" >
                            {countries.map(country => (
                              <SelectItem key={country.value} value={country.label} className="cursor-pointer hover:bg-muted">{country.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            <Button type="submit" className="mt-1 w-full" disabled={loading}>
              {loading && <LoadingIcon />}
              {loading ? "Registering..." : "Register"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
