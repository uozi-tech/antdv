<script setup lang="ts">
// import { PaginationProps, TableProps } from 'ant-design-vue'
import { type VNode, onMounted, watchEffect, computed, reactive } from 'vue'
import { i18n } from './i18n'
import { FCurdProps, FTableBodyScope, FTableHeaderScope } from './types'
import FForm from './FForm.vue'
import { useConfigContextInject } from 'ant-design-vue/es/config-provider/context'
import useCurd from './hook/useCurd'

const { locale: lang } = useConfigContextInject().locale?.value ?? { locale: 'en' }

const props = defineProps<FCurdProps>()

const { mode, data, formData, formVisible, pagination, getList, handleRead, handleAdd, handleEdit, handleSave } = useCurd(props, lang)

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
  return props.columns.filter((item) => item.dataIndex !== 'action' && item.key !== 'action')
})

watchEffect(() => getList(searchFormData))

onMounted(getList)

function CustomRender(props: { node: VNode }) {
  return props.node
}
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
    <a-table :data-source="data" :columns="columns" :pagination="pagination as any">
      <template #headerCell="{ title, column }: FTableHeaderScope">
        <template v-if="column?.customHeaderRender">
          <custom-render :node="column?.customHeaderRender({ title, column })" />
        </template>
      </template>
      <template #bodyCell="{ record, column }: FTableBodyScope">
        <template v-if="column?.dataIndex === 'action' && !column?.customRender">
          <a-button size="small" type="link" v-bind="column?.btnProps" @click="handleRead()">
            {{ i18n[lang].read }}
          </a-button>
          <a-button size="small" type="link" v-bind="column?.btnProps" @click="handleEdit(record)" v-if="!props.disableEdit">
            {{ i18n[lang].edit }}
          </a-button>
          <a-popconfirm :title="i18n[lang].confirmDelete" v-if="!props.disableDelete">
            <a-button size="small" type="link" v-bind="column?.btnProps" danger> {{ i18n[lang].delete }} </a-button>
          </a-popconfirm>
        </template>
      </template>
    </a-table>
    <a-modal :width="props.modalWidth" :title="i18n[lang][mode]" v-model:open="formVisible" @ok="handleSave">
      <f-form :data="formData" :api="props.api" :columns="dataColumns" />
    </a-modal>
  </a-card>
</template>

<style scoped>
.wrapper {
  display: flex;
}

.header {
  display: flex;
  justify-content: space-between;
}

.pagination {
  display: flex;
  justify-content: end;
}
</style>
