import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "./ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "./ui/scroll-area"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTrigger } from "./ui/dialog"
import { TermsConditionsDialogueContent } from "./terms-conditions-dialog-content"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { SubscriptionTier } from "@/types/subscription"
import { buySubscription } from "@/api/subscription-api"
import { LoadingIcon } from "./loading-icon"
import { formatIDRCurrency } from "@/utils/utils"

const SubscriptionSchema = z.object({
  full_name: z.string().min(1, "Full Name cannot be empty").max(100, "Full Name must be at most 100 characters long."),
  tax_id: z.string(),
  country: z.string(),
  terms: z.boolean().default(false),
})
  .refine(({ terms }) => terms === true, {
    message: "You must accept the terms and conditions",
    path: ["terms"],
  })

export function SubscriptionDrawer({ tier }: { tier: SubscriptionTier }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  const subscriptionForm = useForm<z.infer<typeof SubscriptionSchema>>({
    resolver: zodResolver(SubscriptionSchema),
    defaultValues: {
      full_name: "",
      tax_id: "",
      country: "",
      terms: false
    }
  })

  async function onSubscriptionSubmit() {
    setLoading(true)

    const formattedData = {
      subscriptionTypeId: tier.id
    }

    try {
      await buySubscription(formattedData)
      toast.success("Your payment is currently being processed", {
        description: "Please refresh this page in a few seconds.",
      })
    } catch (err: any) {
      if (err.status == 403) toast.error("You've already bought a subscription. Please wait until it has expired.")
      else toast.error(err.message || "Purchase failed. Please try again later.")
    } finally {
      setLoading(false)
      handleDrawerClose()
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
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger className="text-white text-sm font-semibold bg-primary py-2 px-4 rounded-md outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] shadow-xs hover:bg-primary/90">
        Subscribe for {formatIDRCurrency(tier.price)}
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center">
        <DrawerHeader className="w-full">
          <DrawerTitle className="text-3xl">Subscribe to {tier.name} Package</DrawerTitle>
          <DrawerDescription className="text-lg">
            Unlock all features available in the {tier.name} plan with a single payment.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-full w-full px-8 overflow-auto">
          <div className="flex flex-col md:flex-row justify-center items-center h-full gap-8 pt-8 pb-8 md:pb-16">
            <div className="w-full xl:w-lg space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Subscription</span>
                <span>{tier.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Price</span>
                <span>{formatIDRCurrency(tier.price)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatIDRCurrency(tier.price)}</span>
              </div>
            </div>

            <div className="lg:w-[1px] border-1 self-stretch" />

            <Form {...subscriptionForm}>
              <form onSubmit={subscriptionForm.handleSubmit(onSubscriptionSubmit)} className="w-full xl:w-lg space-y-4">
                <FormField
                  control={subscriptionForm.control}
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
                    control={subscriptionForm.control}
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
                    control={subscriptionForm.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Country (Optional)</FormLabel>
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
                                  <SelectItem key={country.value} value={country.value} className="cursor-pointer hover:bg-muted">{country.label}</SelectItem>
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
                  control={subscriptionForm.control}
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
                                  subscriptionForm.setValue("terms", true)
                                  subscriptionForm.trigger("terms")
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
                  {loading ? "Purchasing..." : "Purchase"}
                </Button>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer >
  )
}
