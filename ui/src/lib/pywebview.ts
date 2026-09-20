export interface SelectedDocument {
  path: string
  name: string
  extension: string
}

export interface ExtractedTable {
  index: number
  columns: string[]
  rows: string[][]
  row_count: number
  column_count: number
}

export interface ExtractionResult {
  filename: string
  path: string
  text: string
  markdown: string
  table_count: number
  tables: ExtractedTable[]
}

export interface ExportResponse {
  success: boolean
  path?: string
  error?: string
  cancelled?: boolean
}

interface StructraAPI {
  select_document(): Promise<SelectedDocument | null>

  extract_document(
    filePath: string
  ): Promise<
    | {
        success: true
        data: ExtractionResult
      }
    | {
        success: false
        error: string
      }
  >

  export_current(
    exportType: "excel" | "word"
  ): Promise<ExportResponse>

  clear_document(): Promise<{
    success: boolean
  }>
}

declare global {
  interface Window {
    pywebview?: {
      api: StructraAPI
    }
  }
}

export function getStructraAPI(): StructraAPI {
  if (!window.pywebview?.api) {
    throw new Error(
      "Structra desktop API is unavailable."
    )
  }

  return window.pywebview.api
}