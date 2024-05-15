import { CustomRenderOptions } from '../types'
import { TagRender } from './TagRender'
import { h } from 'vue'

export function CustomRender(props: CustomRenderOptions & { tagMap: Map<string, Map<string | number, string>> }) {
  return h(TagRender, props)
}
