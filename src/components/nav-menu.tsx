const navigations = [
  {
    title: "Browse",
    href: "/browse",
  },
  {
    title: "News",
    href: "/news",
  },
  {
    title: "Subscription",
    href: "/",
  },
]

export function NavMenu({ variant }: { variant?: string }) {
  return (
    <div className={variant === "sidebar" ? "p-2 flex flex-col space-y-4" : "flex gap-8"}>
      {navigations.map((navigation, index) => (
        <a
          href={navigation.href}
          key={index}
          className={variant === "sidebar"
            ? "px-4 py-2 text-base font-semibold rounded-md hover:bg-sidebar-accent decoration-1 focus:bg-sidebar-accent"
            : "px-4 py-2 m-0 text-sm font-semibold rounded-md hover:bg-sidebar-accent decoration-1 focus:bg-sidebar-accent"}
        >
          {navigation.title}
        </a>
      ))}
    </div>
  )
}
