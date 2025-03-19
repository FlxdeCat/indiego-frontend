import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { cva } from "class-variance-authority"

const navigations: { title: string; href: string; }[] = [
  {
    title: "Browse",
    href: "/browse",
  },
  {
    title: "News",
    href: "/",
  },
  {
    title: "Subscription",
    href: "/",
  }
]

export function NavMenu() {

  const navigationMenuTriggerStyle = cva(
    "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:focus:bg-accent data-[state=open]:bg-accent/50 ring-ring/10 dark:ring-ring/20 dark:outline-ring/40 outline-ring/50 transition-[color,box-shadow] focus-visible:ring-4 focus-visible:outline-1"
  )

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigations.map((navigation, index) => {
          return (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink href={navigation.href} className={navigationMenuTriggerStyle()}>
              {navigation.title}
            </NavigationMenuLink>
          </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
