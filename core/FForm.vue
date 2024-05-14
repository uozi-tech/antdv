<script setup lang="tsx">
import { Form, FormItem } from 'ant-design-vue'
import { FTableColumn } from './types'
import { get } from 'lodash-es'
import getFormItem from './form_controls'
import { inject } from 'vue'
import { i18n } from './i18n'

const props = defineProps<{
  labelAlign?: 'left' | 'right'
  columns: FTableColumn[]
  api: Record<string, (params: Record<string, any>) => Promise<unknown>>
  layout?: 'horizontal' | 'vertical' | 'inline'
  isSearchForm?: boolean
}>()

const formData = defineModel<Record<string, any>>('data', { required: true })

function placeholderHelper(type, title, form) {
  const lang = inject('lang', 'zh-CN')
  const isInputType = type === 'input' || type === 'input-number'
  if (!form[type]?.placeholder) {
    !form[type] && (form[type] = {})
    form[type].placeholder = `${i18n[lang].please}${i18n[lang][isInputType ? 'input' : 'select']}${form?.formItem?.name ?? title}`
  }
}

function FormItemRender(p: { column: FTableColumn }) {
  let item

  const { title, dataIndex, form } = p.column
  placeholderHelper(form?.type, title, form)

  if (typeof form?.type === 'function') {
    // Support custom render function
    item = form?.type(formData, p.column)
  } else if (typeof form?.type === 'object' && form?.type?.name) {
    // Support custom component, but need to pass column to component and define model for it
    item = <form.type modelValue={get(formData.value, form?.formItem?.prop ?? dataIndex)} column={p.column} />
  } else {
    item = getFormItem(props.api, formData, form, dataIndex as string | string[])
  }
  return (
    <FormItem
      {...form?.formItem}
      label={form?.formItem?.label ?? title}
      rules={props.isSearchForm ? [] : form?.formItem?.rules}
      required={!props.isSearchForm && form?.formItem?.required}
      name={form?.formItem?.name ?? dataIndex}
    >
      {item}
    </FormItem>
  )
}
</script>

<template>
  <Form :model="formData" label-width="auto" :labelAlign="labelAlign ?? 'left'" :layout="props.layout ?? 'vertical'">
    <form-item-render v-for="c in props.columns" :key="c.dataIndex" :column="c" />
  </Form>
</template>
