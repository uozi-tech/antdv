import { CustomRenderOptions, FTableColumn } from '../types'
import { get, isArray } from 'lodash-es'
import { Tag } from 'ant-design-vue'

export function buildTagMap(columns: FTableColumn[]) {
  const tagsMap = new Map()
  columns.forEach((item) => {
    if (isArray(item.tags)) {
      const colors = ['pink', 'orange', 'green', 'red', 'cyan', 'blue', 'purple', 'geekblue']
      const colorMap = new Map()
      item.tags.forEach((key: number | string, index) => {
        colorMap.set(key, colors[index])
      })
      let dataIndex = item.dataIndex
      if (isArray(item.dataIndex)) {
        dataIndex = item.dataIndex.join('.')
      }
      tagsMap.set(dataIndex, colorMap)
    }
  })
  return tagsMap
}

export function TagRender(props: CustomRenderOptions & { tagMap: Map<string, Map<string | number, string>> }) {
  const { record, column } = props
  const value = get(record, column.dataIndex)
  const actualNode = column.customRender ? column.customRender(props) : value
  if (isArray(column.tags)) {
    let key: string
    if (isArray(column.dataIndex)) {
      key = column.dataIndex.join('.')
    } else {
      key = column.dataIndex
    }
    const colorsMap = props.tagMap.get(key)
    return <Tag color={colorsMap?.get(value)}>{actualNode}</Tag>
  }
  if (typeof column.tags === 'object') {
    return <Tag color={column.tags[value]}>{actualNode}</Tag>
  }
  return actualNode
}
