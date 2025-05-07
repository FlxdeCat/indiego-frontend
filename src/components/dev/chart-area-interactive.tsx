import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

const chartData = [
  { date: "2024-04-01", downloads: 222 },
  { date: "2024-04-02", downloads: 97 },
  { date: "2024-04-03", downloads: 167 },
  { date: "2024-04-04", downloads: 242 },
  { date: "2024-04-05", downloads: 373 },
  { date: "2024-04-06", downloads: 301 },
  { date: "2024-04-07", downloads: 245 },
  { date: "2024-04-08", downloads: 409 },
  { date: "2024-04-09", downloads: 59 },
  { date: "2024-04-10", downloads: 261 },
  { date: "2024-04-11", downloads: 327 },
  { date: "2024-04-12", downloads: 292 },
  { date: "2024-04-13", downloads: 342 },
  { date: "2024-04-14", downloads: 137 },
  { date: "2024-04-15", downloads: 120 },
  { date: "2024-04-16", downloads: 138 },
  { date: "2024-04-17", downloads: 446 },
  { date: "2024-04-18", downloads: 364 },
  { date: "2024-04-19", downloads: 243 },
  { date: "2024-04-20", downloads: 89 },
  { date: "2024-04-21", downloads: 137 },
  { date: "2024-04-22", downloads: 224 },
  { date: "2024-04-23", downloads: 138 },
  { date: "2024-04-24", downloads: 387 },
  { date: "2024-04-25", downloads: 215 },
  { date: "2024-04-26", downloads: 75 },
  { date: "2024-04-27", downloads: 383 },
  { date: "2024-04-28", downloads: 122 },
  { date: "2024-04-29", downloads: 315 },
  { date: "2024-04-30", downloads: 454 },
  { date: "2024-05-01", downloads: 165 },
  { date: "2024-05-02", downloads: 293 },
  { date: "2024-05-03", downloads: 247 },
  { date: "2024-05-04", downloads: 385 },
  { date: "2024-05-05", downloads: 481 },
  { date: "2024-05-06", downloads: 498 },
  { date: "2024-05-07", downloads: 388 },
  { date: "2024-05-08", downloads: 149 },
  { date: "2024-05-09", downloads: 227 },
  { date: "2024-05-10", downloads: 293 },
  { date: "2024-05-11", downloads: 335 },
  { date: "2024-05-12", downloads: 197 },
  { date: "2024-05-13", downloads: 197 },
  { date: "2024-05-14", downloads: 448 },
  { date: "2024-05-15", downloads: 473 },
  { date: "2024-05-16", downloads: 338 },
  { date: "2024-05-17", downloads: 499 },
  { date: "2024-05-18", downloads: 315 },
  { date: "2024-05-19", downloads: 235 },
  { date: "2024-05-20", downloads: 177 },
  { date: "2024-05-21", downloads: 82 },
  { date: "2024-05-22", downloads: 81 },
  { date: "2024-05-23", downloads: 252 },
  { date: "2024-05-24", downloads: 294 },
  { date: "2024-05-25", downloads: 201 },
  { date: "2024-05-26", downloads: 213 },
  { date: "2024-05-27", downloads: 420 },
  { date: "2024-05-28", downloads: 233 },
  { date: "2024-05-29", downloads: 78 },
  { date: "2024-05-30", downloads: 340 },
  { date: "2024-05-31", downloads: 178 },
  { date: "2024-06-01", downloads: 178 },
  { date: "2024-06-02", downloads: 470 },
  { date: "2024-06-03", downloads: 103 },
  { date: "2024-06-04", downloads: 439 },
  { date: "2024-06-05", downloads: 88 },
  { date: "2024-06-06", downloads: 294 },
  { date: "2024-06-07", downloads: 323 },
  { date: "2024-06-08", downloads: 385 },
  { date: "2024-06-09", downloads: 438 },
  { date: "2024-06-10", downloads: 155 },
  { date: "2024-06-11", downloads: 92 },
  { date: "2024-06-12", downloads: 492 },
  { date: "2024-06-13", downloads: 81 },
  { date: "2024-06-14", downloads: 426 },
  { date: "2024-06-15", downloads: 307 },
  { date: "2024-06-16", downloads: 371 },
  { date: "2024-06-17", downloads: 475 },
  { date: "2024-06-18", downloads: 107 },
  { date: "2024-06-19", downloads: 341 },
  { date: "2024-06-20", downloads: 408 },
  { date: "2024-06-21", downloads: 169 },
  { date: "2024-06-22", downloads: 317 },
  { date: "2024-06-23", downloads: 480 },
  { date: "2024-06-24", downloads: 132 },
  { date: "2024-06-25", downloads: 141 },
  { date: "2024-06-26", downloads: 434 },
  { date: "2024-06-27", downloads: 448 },
  { date: "2024-06-28", downloads: 149 },
  { date: "2024-06-29", downloads: 103 },
  { date: "2024-06-30", downloads: 446 },
]

const chartConfig = {
  downloads: {
    label: "Downloads",
    color: "var(--chart-1)",
  }
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("30d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>Total Downloads</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:block hidden">
            Total game downloads for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              Last 3 months
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Last 30 days
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Last 7 days
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDownloads" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-downloads)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-downloads)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="downloads"
              type="natural"
              fill="url(#fillDownloads)"
              stroke="var(--color-downloads)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
