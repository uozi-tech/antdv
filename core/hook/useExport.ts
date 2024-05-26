import { utils, writeFile } from 'xlsx'

export function useExport(api?: (params: Record<string, any>) => Promise<any>) {
  const onExportExcel = (rows, selectRowKey) => {
    if (api) {
      api({ id: selectRowKey })?.then((res) => {
        excel(res.data)
      })
    } else {
      excel(rows)
    }
  }

  return {
    onExportExcel,
  }
}

function excel(data: Record<string, any>[]) {
  const worksheet = utils.json_to_sheet(data)
  const workbook = utils.book_new()

  utils.book_append_sheet(workbook, worksheet, 'Dates')
  writeFile(workbook, `test.xlsx`)
}
