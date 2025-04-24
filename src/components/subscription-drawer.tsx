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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { SubscriptionTier } from "./subscription-card"
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

const SubscriptionSchema = z.object({
  card: z.string().refine(
    (nums) => {
      const digits = nums.replace(/\s/g, '')
      return /^\d{15,16}$/.test(digits)
    },
    { message: 'Invalid card number format' }
  ),
  expiry: z.string().regex(/^\d{2}\/\d{2}$/, 'Invalid expiry format'),
  cvc: z.string().regex(/^\d{3,4}$/, 'CVC must be 3 or 4 digits'),
  terms: z.boolean().default(false),
})
  .refine(({ terms }) => terms === true, {
    message: "You must accept the terms and conditions",
    path: ["terms"],
  })

export function SubscriptionDrawer({ tier }: { tier: SubscriptionTier }) {

  const subscriptionForm = useForm<z.infer<typeof SubscriptionSchema>>({
    resolver: zodResolver(SubscriptionSchema),
    defaultValues: {
      card: "",
      expiry: "",
      cvc: "",
      terms: false
    }
  })

  function onSubscriptionSubmit(data: z.infer<typeof SubscriptionSchema>) {
    console.log(JSON.stringify(data, null, 2))
  }

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 16)
    const formatted = digits.match(/.{1,4}/g)?.join(' ') || ''
    return formatted
  }

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4)
    return cleaned.length > 2
      ? `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`
      : cleaned
  }

  const handleCardInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    subscriptionForm.setValue('card', formatted)
  }

  const handleExpiryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value)
    subscriptionForm.setValue('expiry', formatted)
  }

  return (
    <Drawer>
      <DrawerTrigger className="text-white text-sm font-semibold bg-primary py-2 px-4 rounded-md outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] shadow-xs hover:bg-primary/90">
        Subscribe for ${tier.price}
      </DrawerTrigger>
      <DrawerContent className="flex flex-col items-center">
        <DrawerHeader className="w-full">
          <DrawerTitle className="text-3xl">Subscribe to {tier.title} Package</DrawerTitle>
          <DrawerDescription className="text-lg">
            Unlock all features available in the {tier.title} plan with a single payment.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-full w-full px-8 overflow-auto">
          <div className="flex flex-col md:flex-row justify-center items-center h-full gap-8 pt-8 pb-8 md:pb-16">
            <div className="w-full xl:w-lg space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Subscription</span>
                <span>{tier.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Price</span>
                <span>${tier.price}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${tier.price}</span>
              </div>
            </div>

            <div className="lg:w-[1px] border-1 self-stretch" />

            <Form {...subscriptionForm}>
              <form onSubmit={subscriptionForm.handleSubmit(onSubscriptionSubmit)} className="w-full xl:w-lg space-y-4">
                <FormField
                  control={subscriptionForm.control}
                  name="card"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="XXXX XXXX XXXX XXXX" onChange={handleCardInput} value={subscriptionForm.watch('card') || ''} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col sm:flex-row gap-4">
                  <FormField
                    control={subscriptionForm.control}
                    name="expiry"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Expiry</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="MM/YY" onChange={handleExpiryInput} value={subscriptionForm.watch('expiry') || ''} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={subscriptionForm.control}
                    name="cvc"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>CVC</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="XXX" />
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
                <Button type="submit" className="mt-1 w-full">Confirm Payment</Button>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
