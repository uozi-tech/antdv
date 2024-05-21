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
const lang = inject('lang', 'en')

function resetForm() {
  formData.value = {}
}

function placeholderHelper(column: FTableColumn, form?: FTableColumn['form']) {
  const type = form?.type
  if (!form || form?.[type]?.placeholder) return

  const lang = inject('lang', 'zh-CN')
  const isInputType = type === 'input' || type === 'input-number'
  if (!form?.[type]) {
    form[type] = {}
  }
  const fieldName = form?.formItem?.name ?? column.title ?? column.dataIndex
  form[type].placeholder = `${i18n[lang].please}${i18n[lang][isInputType ? 'input' : 'select']}${fieldName}`
}

function FormItemRender(p: { column: FTableColumn }) {
  let item

  const { title, dataIndex, form } = p.column
  placeholderHelper(p.column, form)

  if (typeof form?.type === 'function') {
    // Support custom render function
    item = form?.type(formData, p.column, props.isSearchForm)
  } else if (typeof form?.type === 'object' && form?.type?.name) {
    // Support custom component, but need to pass column to component and define model for it
    item = (
      <form.type
        modelValue={get(formData.value, form?.formItem?.prop ?? dataIndex)}
        column={p.column}
        is-search-form={props.isSearchForm}
      />
    )
  } else {
    item = getFormItem(props.api, formData, form, dataIndex as string | string[], lang, props.isSearchForm)
  }
  return (
    <FormItem
      style="margin-bottom: 12px;"
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
    <a-button v-if="props.isSearchForm" @click="resetForm">{{ i18n[lang].reset }}</a-button>
  </Form>
</template>
