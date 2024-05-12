<script setup lang="tsx">
import { Form, FormItem } from 'ant-design-vue'
import { FTableColumn } from './types'
import { get } from 'lodash-es'
import getFormItem from './form_controls'

const props = defineProps<{
  labelAlign?: 'left' | 'right'
  columns: FTableColumn[]
  api: Record<string, (params: Record<string, any>) => Promise<unknown>>
  layout?: 'horizontal' | 'vertical' | 'inline'
  isSearchForm?: boolean
}>()

const formData = defineModel<Record<string, any>>('data', { required: true })

function FormItemRender(p: { column: FTableColumn }) {
  let item

  const { title, dataIndex, form } = p.column

  // Support custom render function
  if (typeof form?.type === 'function') {
    item = form?.type(formData, p.column)
  }
  // Support custom component, but need to pass column to component and define model for it
  else if (typeof form?.type === 'object' && form?.type?.name) {
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
    <form-item-render v-for="c in props.columns" :key="c.prop" :column="c" />
  </Form>
</template>
