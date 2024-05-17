<script setup lang="tsx">
import { watch, computed, provide, ref, type VNode } from 'vue'
import { i18n } from './i18n'
import { FTableHeaderScope, FTableBodyScope, FCurdProps } from './types'
import FForm from './FForm.vue'
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context'
import useCurd from './hook/useCurd'
import Detail from './Detail.vue'
import { buildTagMap } from './render/TagRender'
import { CustomRender } from './render/CustomRender'
import { TableColumnType } from 'ant-design-vue'
import { debounce } from 'lodash-es'
import useLocalStorage from './hook/useLocalStorage'

const props = defineProps<FCurdProps>()
const { locale: lang } = useConfigContextInject().locale?.value ?? { locale: 'en' }

provide('lang', lang)

const {
  tableLoading,
  modalLoading,
  mode,
  data,
  formData,
  formVisible,
  pagination,
  getList,
  handleRead,
  handleAdd,
  handleEdit,
  handleSave,
} = useCurd(props, lang)
const selectedRowKeys = ref<(string | number)[]>([])

const searchColumns = computed(() => {
  return props.columns.filter((item) => item.search)
})

const dataColumns = computed(() => {
  return props.columns.filter((item) => item.dataIndex !== 'actions' && item.key !== 'actions' && item.form)
})

const tagMap = ref(buildTagMap(dataColumns.value))

const getData = debounce(() => getList(searchFormData.value), 400, { leading: false, trailing: true })

const searchFormData = useLocalStorage('params', {})

watch(searchFormData, getData, { immediate: true, deep: true })

function onSelectedChange(keys: (string | number)[]) {
  selectedRowKeys.value = keys
}

function CustomHeaderRender(props: { node: VNode }) {
  return props.node
}
</script>

<template>
  <a-card>
    <template #title>
      {{ props.title ?? i18n[lang].list }}
      <slot name="titleRight" />
    </template>
    <template #extra>
      <slot name="beforeAdd" />
      <a-button v-if="!props.disableAdd" type="link" @click="handleAdd">{{ i18n[lang].add }}</a-button>
      <slot name="afterAdd" />
    </template>
    <f-form
      v-if="!props.disableSearch"
      style="margin-bottom: 16px"
      :api="props.api"
      v-model:data="searchFormData"
      :columns="searchColumns"
      layout="inline"
      isSearchForm
    />
    <a-spin :spinning="tableLoading">
      <a-table
        :row-key="props.rowKey ?? 'id'"
        :row-selection="{
          selectedRowKeys,
          onChange: onSelectedChange,
          type: props.rowSelectionType ?? 'checkbox',
        }"
        :data-source="data"
        :columns="columns as TableColumnType[]"
        v-model:pagination="pagination"
        :scroll="{ x: props.scrollX ?? 2400, y: props.scrollY }"
      >
        <template #headerCell="{ title, column }: FTableHeaderScope">
          <template v-if="column?.customHeaderRender">
            <custom-header-render :node="column?.customHeaderRender({ title, column })" />
          </template>
        </template>
        <template #bodyCell="{ record, column, ...rest }: FTableBodyScope">
          <template v-if="column?.dataIndex === 'actions' && !column?.customRender">
            <slot name="beforeActions" :record="record" :column="column" />
            <a-button size="small" type="link" v-bind="column?.btnProps" @click="handleRead(record)">
              {{ i18n[lang].read }}
            </a-button>
            <a-button v-if="!props.disableEdit" size="small" type="link" v-bind="column?.btnProps" @click="handleEdit(record)">
              {{ i18n[lang].edit }}
            </a-button>
            <a-popconfirm v-if="!props.disableDelete" :title="i18n[lang].confirmDelete">
              <a-button size="small" type="link" v-bind="column?.btnProps" danger> {{ i18n[lang].delete }} </a-button>
            </a-popconfirm>
            <slot name="afterActions" :record="record" :column="column" />
          </template>
          <template v-if="column?.tags">
            <custom-render v-bind="{ record, column, renderIndex: rest.index, ...rest, tagMap }" />
          </template>
        </template>
      </a-table>
    </a-spin>
    <a-modal
      style="max-height: 80vh"
      :closable="!modalLoading"
      :width="props.modalWidth"
      :title="i18n[lang][mode]"
      v-model:open="formVisible"
      @ok="handleSave"
    >
      <a-spin :spinning="modalLoading">
        <div style="overflow-y: auto; max-height: 70vh">
          <f-form v-if="mode !== 'read'" v-model:data="formData" :api="props.api" :columns="dataColumns" />
          <detail v-else :tag-map="tagMap" :columns="props.columns" :record="formData" />
        </div>
      </a-spin>
      <template #footer>
        <a-button :disabled="modalLoading" @click="formVisible = false">{{ i18n[lang].close }}</a-button>
        <a-button v-if="mode !== 'read'" :loading="modalLoading" type="primary" @click="handleSave">{{ i18n[lang].save }}</a-button>
      </template>
    </a-modal>
  </a-card>
</template>
