import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

const navigations: { title: string; href: string; }[] = [
  {
    title: "Menu 1",
    href: "/",
  },
  {
    title: "Menu 2",
    href: "/",
  },
  {
    title: "Menu 3",
    href: "/",
  }
]

export function NavMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {navigations.map((navigation, index) => {
          return (
          <NavigationMenuItem key={index}>
            <a href={navigation.href}>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {navigation.title}
              </NavigationMenuLink>
            </a>
          </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
