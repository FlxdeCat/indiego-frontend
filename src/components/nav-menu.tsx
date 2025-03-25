const navigations = [
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
  },
]

export function NavMenu({ orientation }: { orientation?: string }) {
  return (
    <div className={orientation === "vertical" ? "p-2 flex flex-col space-y-4" : "flex gap-8"}>
      {navigations.map((navigation, index) => (
        <a
          href={navigation.href}
          key={index}
          className={orientation === "vertical" 
            ? "p-2 text-md font-semibold rounded-md hover:underline decoration-2 focus:bg-sidebar-accent"
            : "p-2 m-0 text-sm font-semibold rounded-md hover:underline decoration-2 focus:bg-sidebar-accent"}
        >
          {navigation.title}
        </a>
      ))}
    </div>
  )
}
