import { useState } from "react"
import {
  FileSpreadsheet,
  FileText,
  Loader2,
  RotateCcw,
  Upload,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  getStructraAPI,
  type ExtractionResult,
} from "@/lib/pywebview"


function App() {
  const [result, setResult] =
    useState<ExtractionResult | null>(null)

  const [extracting, setExtracting] = useState(false)

  const [exporting, setExporting] =
    useState<"excel" | "word" | null>(null)

  const [error, setError] =
    useState<string | null>(null)


  async function selectDocument() {
    try {
      setError(null)

      const api = getStructraAPI()

      const document =
        await api.select_document()

      if (!document) return

      setExtracting(true)

      const response =
        await api.extract_document(
          document.path
        )

      if (!response.success) {
        setError(response.error)
        return
      }

      setResult(response.data)

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      )
    } finally {
      setExtracting(false)
    }
  }


  async function exportDocument(
    type: "excel" | "word"
  ) {
    try {
      setExporting(type)
      setError(null)

      const api = getStructraAPI()

      const response =
        await api.export_current(type)

      if (
        !response.success &&
        !response.cancelled
      ) {
        setError(
          response.error ??
            "Export failed."
        )
      }

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Export failed."
      )
    } finally {
      setExporting(null)
    }
  }


  async function reset() {
    try {
      const api = getStructraAPI()

      await api.clear_document()
    } catch {
      // Ignore if API isn't available.
    }

    setResult(null)
    setError(null)
  }


  return (
    <main className="min-h-screen bg-muted/30">
      <div className="mx-auto max-w-6xl px-8 py-10">

        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Structra
            </h1>

            <p className="mt-1 text-sm text-muted-foreground">
              Turn documents into editable data.
            </p>
          </div>

          {result && (
            <Button
              variant="outline"
              onClick={reset}
            >
              <RotateCcw className="size-4" />
              New document
            </Button>
          )}
        </header>


        {error && (
          <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}


        {!result ? (
          <UploadScreen
            loading={extracting}
            onSelect={selectDocument}
          />
        ) : (
          <ResultsScreen
            result={result}
            exporting={exporting}
            onExport={exportDocument}
          />
        )}

      </div>
    </main>
  )
}


function UploadScreen({
  loading,
  onSelect,
}: {
  loading: boolean
  onSelect: () => void
}) {
  return (
    <Card className="border-dashed shadow-none">
      <CardContent className="flex min-h-[500px] flex-col items-center justify-center">

        {loading ? (
          <>
            <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
              <Loader2 className="size-7 animate-spin" />
            </div>

            <h2 className="mt-6 text-lg font-medium">
              Extracting document
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Structra is analyzing text and tables locally.
            </p>
          </>
        ) : (
          <>
            <div className="flex size-16 items-center justify-center rounded-2xl bg-muted">
              <Upload className="size-7" />
            </div>

            <h2 className="mt-6 text-xl font-medium">
              Drop a document here
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              PDF, PNG, JPG or JPEG
            </p>

            <Button
              className="mt-6"
              onClick={onSelect}
            >
              Choose document
            </Button>

            <p className="mt-5 text-xs text-muted-foreground">
              Processed locally. Your documents never leave your device.
            </p>
          </>
        )}

      </CardContent>
    </Card>
  )
}


function ResultsScreen({
  result,
  exporting,
  onExport,
}: {
  result: ExtractionResult
  exporting: "excel" | "word" | null
  onExport: (
    type: "excel" | "word"
  ) => void
}) {
  return (
    <div className="space-y-6">

      <Card className="shadow-none">
        <CardContent className="flex items-center justify-between py-5">

          <div className="flex items-center gap-4">

            <div className="flex size-11 items-center justify-center rounded-lg bg-muted">
              <FileText className="size-5" />
            </div>

            <div>
              <p className="font-medium">
                {result.filename}
              </p>

              <div className="mt-1 flex gap-2">
                <Badge variant="secondary">
                  {result.table_count}{" "}
                  {result.table_count === 1
                    ? "table"
                    : "tables"}
                </Badge>

                <span className="text-xs text-muted-foreground">
                  {result.text.length.toLocaleString()} characters
                </span>
              </div>
            </div>

          </div>


          <div className="flex gap-2">

            <Button
              variant="outline"
              disabled={exporting !== null}
              onClick={() =>
                onExport("word")
              }
            >
              {exporting === "word" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <FileText className="size-4" />
              )}

              Word
            </Button>


            <Button
              disabled={
                exporting !== null ||
                result.table_count === 0
              }
              onClick={() =>
                onExport("excel")
              }
            >
              {exporting === "excel" ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <FileSpreadsheet className="size-4" />
              )}

              Excel
            </Button>

          </div>

        </CardContent>
      </Card>


      <Tabs
        defaultValue={
          result.table_count > 0
            ? "tables"
            : "text"
        }
      >
        <TabsList>
          <TabsTrigger value="text">
            Text
          </TabsTrigger>

          <TabsTrigger value="tables">
            Tables
            {result.table_count > 0 && (
              <span className="ml-2 text-xs">
                {result.table_count}
              </span>
            )}
          </TabsTrigger>
        </TabsList>


        <TabsContent
          value="text"
          className="mt-4"
        >
          <Card className="shadow-none">
            <CardContent className="p-6">

              <div className="max-h-[600px] overflow-auto rounded-lg bg-muted/40 p-6">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-7">
                  {result.text}
                </pre>
              </div>

            </CardContent>
          </Card>
        </TabsContent>


        <TabsContent
          value="tables"
          className="mt-4 space-y-6"
        >

          {result.tables.length === 0 ? (
            <Card className="shadow-none">
              <CardContent className="py-16 text-center text-sm text-muted-foreground">
                No tables were detected in this document.
              </CardContent>
            </Card>
          ) : (
            result.tables.map(
              (table) => (
                <Card
                  key={table.index}
                  className="overflow-hidden shadow-none"
                >
                  <div className="flex items-center justify-between border-b px-6 py-4">

                    <p className="font-medium">
                      Table {table.index}
                    </p>

                    <span className="text-xs text-muted-foreground">
                      {table.row_count} rows ×{" "}
                      {table.column_count} columns
                    </span>

                  </div>


                  <div className="overflow-auto">
                    <Table>

                      <TableHeader>
                        <TableRow>
                          {table.columns.map(
                            (
                              column,
                              index
                            ) => (
                              <TableHead
                                key={index}
                              >
                                {column}
                              </TableHead>
                            )
                          )}
                        </TableRow>
                      </TableHeader>


                      <TableBody>
                        {table.rows.map(
                          (row, rowIndex) => (
                            <TableRow
                              key={rowIndex}
                            >
                              {row.map(
                                (
                                  value,
                                  cellIndex
                                ) => (
                                  <TableCell
                                    key={
                                      cellIndex
                                    }
                                  >
                                    {value}
                                  </TableCell>
                                )
                              )}
                            </TableRow>
                          )
                        )}
                      </TableBody>

                    </Table>
                  </div>

                </Card>
              )
            )
          )}

        </TabsContent>
      </Tabs>

    </div>
  )
}


export default App