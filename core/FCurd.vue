<script setup lang="tsx">
import { onMounted, watchEffect, computed, reactive, provide, ref, VNode } from 'vue'
import { i18n } from './i18n'
import { FCurdProps, FTableHeaderScope, FTableBodyScope } from './types'
import FForm from './FForm.vue'
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context'
import useCurd from './hook/useCurd'
// import { get, isArray } from 'lodash-es'
import Detail from './Detail.vue'
import { buildTagMap } from './Render/TagRender'
import { CustomRender } from './Render/CustomRender'
import { TableColumnType } from 'ant-design-vue'

const { locale: lang } = useConfigContextInject().locale?.value ?? { locale: 'en' }

provide('lang', lang)

const props = defineProps<FCurdProps>()

const { mode, data, formData, formVisible, pagination, getList, handleRead, handleAdd, handleEdit, handleSave } = useCurd(props, lang)

const loading = ref(true)
const searchFormData = reactive<Record<string, any>>({})

const searchColumns = computed(() => {
  return props.columns.filter((item) => {
    if (item.search) {
      searchFormData[item.dataIndex as string] = undefined
    }
    return item.search
  })
})

const dataColumns = computed(() => {
  return props.columns.filter((item) => item.dataIndex !== 'actions' && item.key !== 'actions' && item.form)
})

watchEffect(() => {
  getList(searchFormData).finally(() => (loading.value = false))
})

onMounted(() => {
  getList(searchFormData).finally(() => (loading.value = false))
})

function CustomHeaderRender(props: { node: VNode }) {
  return props.node
}

const tagMap = ref(buildTagMap(dataColumns.value))
</script>

<template>
  <a-card>
    <template #title>
      {{ props.title ?? i18n[lang].list }}
      <slot name="title-right" />
    </template>
    <template #extra>
      <slot name="before-add" />
      <a-button v-if="!props.disableAdd" type="link" @click="handleAdd">{{ i18n[lang].add }}</a-button>
      <slot name="after-add" />
    </template>
    <f-form style="margin-bottom: 16px" :api="props.api" :data="searchFormData" :columns="searchColumns" layout="inline" isSearchForm />
    <a-spin :spinning="loading">
      <a-table :data-source="data" :columns="columns as TableColumnType[]" :pagination="pagination" :scroll="{ x: 3000 }">
        <template #headerCell="{ title, column }: FTableHeaderScope">
          <template v-if="column?.customHeaderRender">
            <custom-header-render :node="column?.customHeaderRender({ title, column })" />
          </template>
        </template>
        <template #bodyCell="{ record, column, ...rest }: FTableBodyScope">
          <template v-if="column?.dataIndex === 'actions' && !column?.customRender">
            <a-button size="small" type="link" v-bind="column?.btnProps" @click="handleRead(record)">
              {{ i18n[lang].read }}
            </a-button>
            <a-button size="small" type="link" v-bind="column?.btnProps" @click="handleEdit(record)" v-if="!props.disableEdit">
              {{ i18n[lang].edit }}
            </a-button>
            <a-popconfirm :title="i18n[lang].confirmDelete" v-if="!props.disableDelete">
              <a-button size="small" type="link" v-bind="column?.btnProps" danger> {{ i18n[lang].delete }} </a-button>
            </a-popconfirm>
          </template>
          <template v-if="column?.tags">
            <custom-render v-bind="{ record, column, renderIndex: rest.index, ...rest, tagMap }" />
          </template>
        </template>
      </a-table>
    </a-spin>
    <a-modal style="max-height: 80vh" :width="props.modalWidth" :title="i18n[lang][mode]" v-model:open="formVisible" @ok="handleSave">
      <div style="overflow-y: auto; max-height: 70vh">
        <f-form v-if="mode !== 'read'" :data="formData" :api="props.api" :columns="dataColumns" />
        <detail v-else :tag-map="tagMap" :columns="props.columns" :record="formData" />
      </div>
      <template #footer>
        <a-button @click="formVisible = false">{{ i18n[lang].close }}</a-button>
        <a-button v-if="mode !== 'read'" type="primary" @click="handleSave">{{ i18n[lang].save }}</a-button>
      </template>
    </a-modal>
  </a-card>
</template>
