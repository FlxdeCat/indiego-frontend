import {
  ColumnDef,
  ColumnFiltersState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronUpIcon,
  ColumnsIcon,
  MoreVerticalIcon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useNavigate } from "react-router"
import { Input } from "../ui/input"
import { DeleteGameDialog } from "@/components/dev/delete-game-dialog"
import { AdminNews } from "./admin-news"
import { AdminReviews } from "./admin-reviews"
import { getNews } from "@/api/news-api"
import { useEffect, useState } from "react"
import { News } from "@/types/news"
import { toast } from "sonner"
import { LoadingIcon } from "../loading-icon"
import { Game } from "@/types/game"

function getGameTableColumns(nav: ReturnType<typeof useNavigate>, setDeleteGameIndex: React.Dispatch<React.SetStateAction<number | null>>): ColumnDef<Game>[] {
  return [
    {
      accessorKey: "cover",
      header: () => (
        <div className="text-center">Cover</div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-center items-center">
          <img
            loading="lazy"
            src={URL.createObjectURL(row.original.cover)}
            alt={row.original.name}
            className="h-48 max-w-full object-contain min-w-32"
          />
        </div>
      ),
      enableHiding: false,
      enableSorting: false,
    },
    {
      accessorKey: "title",
      header: () => (
        <div className="w-full text-center flex-1">Title</div>
      ),
      cell: ({ row }) => (
        <div className="text-center flex-1 text-lg font-bold">{row.original.name}</div>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "developer",
      header: () => (
        <div className="w-full text-center flex-1">Developer</div>
      ),
      cell: ({ row }) => (
        <div className="text-center flex-1 text-lg">{row.original.devName}</div>
      ),
      enableHiding: false,
    },
    {
      accessorKey: "genre",
      header: () => (
        <div className="w-full text-center">Genre</div>
      ),
      cell: ({ row }) => (
        <div className="w-full flex justify-center">
          <div className="flex flex-wrap gap-2 justify-center items-center max-w-60">
            {row.original.genres.map((genre, idx) => (
              <Badge
                key={idx}
                variant="outline"
                className="px-1.5 text-muted-foreground"
              >
                {genre}
              </Badge>
            ))}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "rating",
      header: () => (
        <div className="w-full text-center flex-1">Rating</div>
      ),
      cell: ({ row }) => (
        <div className="text-center flex-1">{row.original.rating}</div>
      ),
    },
    {
      accessorKey: "downloads",
      header: () => (
        <div className="w-full text-center flex-1">Downloads</div>
      ),
      cell: ({ row }) => (
        <div className="text-center flex-1">{row.original.downloads}</div>
      ),
    },
    {
      accessorKey: "reviews",
      header: () => (
        <div className="w-full text-center flex-1">Reviews</div>
      ),
      cell: ({ row }) => (
        <div className="text-center flex-1">{row.original.reviewIds.length}</div>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex text-muted-foreground data-[state=open]:bg-muted"
                size="icon"
              >
                <MoreVerticalIcon />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mr-4 -mt-4">
              <DropdownMenuItem
                onClick={() => nav(`/game/${row.original.id}`)}
              >
                Go to Game Page
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button
                  className="w-full text-left"
                  onClick={() => {
                    setTimeout(() => {
                      setDeleteGameIndex(row.index)
                    }, 10)
                  }}
                >
                  Delete
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
      enableSorting: false,
    },
  ]
}

function MainTableRow({ row }: { row: Row<Game> }) {
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      className="relative z-0"
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} className="text-center">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

export function AdminDataTable({
  data: initialData,
}: {
  data: Game[]
}) {
  const [data, _] = useState(() => initialData)
  const [activeTab, setActiveTab] = useState<"games" | "news" | "reviews">("games")
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const [deleteGameIndex, setDeleteGameIndex] = useState<number | null>(null)

  const nav = useNavigate()
  const columns = getGameTableColumns(nav, setDeleteGameIndex)

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const [newsLoading, setNewsLoading] = useState(false)
  const [newss, setNewss] = useState<News[]>([])

  async function getNewsData() {
    setNewsLoading(true)

    try {
      const selfNewsResponse = await getNews()
      setNewss(selfNewsResponse)
    } catch (err: any) {
      toast.error(err.message || "Fetch news failed. Please try again later.")
    } finally {
      setNewsLoading(false)
    }
  }

  useEffect(() => {
    getNewsData()
  }, [])

  return (
    <>
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "games" | "news" | "reviews")}
        className="flex w-full flex-col justify-start gap-6"
      >
        <div className="flex items-center justify-between px-4 lg:px-6 gap-2">
          <Label htmlFor="view-selector" className="sr-only">
            View
          </Label>
          <Select value={activeTab} onValueChange={(value) => setActiveTab(value as "games" | "news")}>
            <SelectTrigger
              className="@4xl/main:hidden flex w-fit"
              id="view-selector"
            >
              <SelectValue placeholder="Select a view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="games">Games</SelectItem>
              <SelectItem value="news">News</SelectItem>
              <SelectItem value="reviews">Reviews</SelectItem>
            </SelectContent>
          </Select>
          <TabsList className="@4xl/main:flex hidden">
            <TabsTrigger value="games">Games</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            {activeTab === "games" && (
              <>
                <Input type="search" placeholder="Search"
                  className="w-full h-8 border input-class"
                  value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                  onChange={(e) => table.getColumn("title")?.setFilterValue(e.target.value)}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <ColumnsIcon />
                      <span className="hidden lg:inline">Customize Columns</span>
                      <span className="lg:hidden">Columns</span>
                      <ChevronDownIcon />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    {table
                      .getAllColumns()
                      .filter(
                        (column) =>
                          typeof column.accessorFn !== "undefined" &&
                          column.getCanHide()
                      )
                      .map((column) => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className="capitalize"
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          >
                            {column.id}
                          </DropdownMenuCheckboxItem>
                        )
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
        <TabsContent
          value="games"
          className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
        >
          <div className="overflow-hidden rounded-lg border">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-muted">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          colSpan={header.colSpan}
                          onClick={header.column.getToggleSortingHandler()}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center justify-center gap-1">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <ChevronUpIcon className="w-4 h-4" />,
                              desc: <ChevronDownIcon className="w-4 h-4" />,
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <MainTableRow key={row.id} row={row} />
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      There are no games yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-center px-4">
            <div className="flex w-full items-center gap-8 lg:w-fit">
              <div className="hidden items-center gap-2 lg:flex">
                <Label htmlFor="rows-per-page" className="text-sm font-medium">
                  Rows per page
                </Label>
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value))
                  }}
                >
                  <SelectTrigger className="w-20" id="rows-per-page">
                    <SelectValue
                      placeholder={table.getState().pagination.pageSize}
                    />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[3, 10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex w-fit items-center justify-center text-sm font-medium">
                Page {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount()}
              </div>
              <div className="ml-auto flex items-center gap-2 lg:ml-0">
                <Button
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => table.setPageIndex(0)}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to first page</span>
                  <ChevronsLeftIcon />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="sr-only">Go to previous page</span>
                  <ChevronLeftIcon />
                </Button>
                <Button
                  variant="outline"
                  className="size-8"
                  size="icon"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to next page</span>
                  <ChevronRightIcon />
                </Button>
                <Button
                  variant="outline"
                  className="hidden size-8 lg:flex"
                  size="icon"
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="sr-only">Go to last page</span>
                  <ChevronsRightIcon />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="news" className="px-4 lg:px-6">
          <div className="border rounded-lg p-4 text-center">
            {newsLoading ? (
              <div className="flex flex-1 items-center justify-center">
                <LoadingIcon size={50} className="text-primary" />
              </div>
            ) : (
              <AdminNews newss={newss} />
            )
            }
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="px-4 lg:px-6">
          <div className="border rounded-lg p-4 text-center">
            <AdminReviews />
          </div>
        </TabsContent>
      </Tabs>

      <DeleteGameDialog
        id={deleteGameIndex !== null ? data[deleteGameIndex].id : ""}
        open={deleteGameIndex !== null}
        title={deleteGameIndex !== null ? data[deleteGameIndex].name : ""}
        onOpenChange={(open) => {
          if (!open) setDeleteGameIndex(null)
        }}
      />
    </>
  )
}