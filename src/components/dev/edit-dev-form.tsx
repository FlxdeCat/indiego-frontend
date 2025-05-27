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
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Pencil } from "lucide-react"
import { Developer } from "@/types/developer"
import { updateDeveloper } from "@/api/developer-api"
import { toast } from "sonner"
import { LoadingIcon } from "../loading-icon"

const DeveloperFormSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  full_name: z.string().min(1, "Full Name cannot be empty"),
  tax_id: z.string(),
  country: z.string(),
})

export function EditDeveloperForm({ dev }: { dev: Developer }) {

  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDialogClose = () => {
    setDialogOpen(false)
  }

  const developerForm = useForm<z.infer<typeof DeveloperFormSchema>>({
    resolver: zodResolver(DeveloperFormSchema),
    defaultValues: {
      name: dev.devName,
      full_name: dev.fullName,
      tax_id: dev.taxId,
      country: dev.country
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
      await updateDeveloper(formattedData)
      window.location.reload()
    } catch (err: any) {
      toast.error(err.message || "Update failed. Please try again later.")
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
    fetch('https://restcountries.com/v3.1/all')
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
        <Button><Pencil />Edit Developer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Developer Data</DialogTitle>
          <DialogDescription>
            Modify the details of your game developer profile below.
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
            <div className="flex flex-col sm:flex-row gap-4">
              <FormField
                control={developerForm.control}
                name="tax_id"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Tax ID (Optional)</FormLabel>
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
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                          <SelectContent className="max-h-120">
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
