import { utils, writeFile } from 'xlsx'
import type { ExportColumn } from '../types'
import { get } from 'lodash-es'
import { Ref } from 'vue'

export function useExport(columns: Ref<ExportColumn[]>, api?: (params: Record<string, any>) => Promise<any>) {
  const exportExcel = (selectedRowKey, selectedRows) => {
    if (api) {
      api({ id: selectedRowKey })?.then((res) => {
        excel(columns.value, res.data)
      })
    } else {
      excel(columns.value, selectedRows)
    }
  }

  return {
    exportExcel,
  }
}

function excel(columns: ExportColumn[], data: Record<string, any>[]) {
  const orderedData = reorderData(data, columns)
  const worksheet = utils.json_to_sheet(orderedData)
  const workbook = utils.book_new()

  utils.book_append_sheet(workbook, worksheet, 'Dates')
  writeFile(workbook, `test.xlsx`)
}

function reorderData(data: Record<string, any>[], columns: ExportColumn[]): Record<string, any>[] {
  return data.map((row) => {
    const reorderedRow = {}
    columns.forEach((col) => {
      if (!col.checked) {
        return
      }
      let cell = get(row, col.dataIndex)
      if (col.customRender) {
        cell = col.customRender({ text: cell, record: row, column: col, export: true })
      }
      reorderedRow[col.title] = cell
    })
    return reorderedRow
  })
}
