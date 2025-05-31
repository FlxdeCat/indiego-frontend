import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatIDRCurrency, formatThousand } from "@/utils/utils"
import { LoadingIcon } from "../loading-icon"

export function SectionCards({ revenue, totalDownloads, loading }: { revenue: number, totalDownloads: number, loading: boolean }) {

  return (
    <div className="*:data-[slot=card]:shadow-xs @3xl/main:grid-cols-2 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">

      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {formatIDRCurrency(revenue)}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="text-muted-foreground">
            Revenue based on total downloads of featured games
          </div>
        </CardFooter>
      </Card>

      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Downloads</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {loading ? (
              <LoadingIcon size={30} className="mt-2" />
            ) : (formatThousand(totalDownloads))
            }
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="text-muted-foreground">
            Total downloads of users on all your games
          </div>
        </CardFooter>
      </Card>

    </div>
  )
}
