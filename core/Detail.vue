<script setup lang="ts">
import { FTableColumn } from './types'
import { get } from 'lodash-es'
import { CustomRender } from './Render/CustomRender'

const props = defineProps<{
  tagMap: Map<string, Map<string | number, string>>
  record: any
  columns: FTableColumn[]
}>()

const displayColumns = props.columns.filter((item) => !item?.hiddenInDetail || item.dataIndex === 'actions')
</script>

<template>
  <a-descriptions bordered :column="{ xxl: 2, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }">
    <a-descriptions-item v-for="(column, index) in displayColumns" :key="index" :label="column.title">
      <CustomRender
        :record="props.record"
        :column="column"
        :text="get(props.record, column.dataIndex)"
        :value="get(props.record, column.dataIndex)"
        :index="index"
        :renderIndex="index"
        :tagMap="props.tagMap"
      />
    </a-descriptions-item>
  </a-descriptions>
</template>

<style scoped></style>
