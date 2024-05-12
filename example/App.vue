<script setup lang="ts">
import { h } from 'vue'
import FCurd from '../core'
import type { FTableColumn } from '../core/types'
import { curd } from './curd'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const columns: FTableColumn[] = [
  {
    title: 'School ID',
    dataIndex: 'school_id',
    search: true,
    form: {
      type: 'input',
      formItem: {
        rules: [
          {
            required: true,
            message: '请输入学工号',
            trigger: 'blur',
          },
          {
            min: 3,
            message: '学工号长度不能小于3',
            trigger: 'blur',
          },
        ],
      },
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
    search: true,
    form: {
      type: 'cascader',
      cascader: {
        options: [
          {
            value: 'guide',
            name: 'Guide',
            children: [
              {
                value: 'disciplines',
                name: 'Disciplines',
                children: [
                  {
                    value: 'consistency',
                    name: 'Consistency',
                  },
                  {
                    value: 'feedback',
                    name: 'Feedback',
                  },
                  {
                    value: 'efficiency',
                    name: 'Efficiency',
                  },
                  {
                    value: 'controllability',
                    name: 'Controllability',
                  },
                ],
              },
              {
                value: 'navigation',
                name: 'Navigation',
                children: [
                  {
                    value: 'side nav',
                    name: 'Side Navigation',
                  },
                  {
                    value: 'top nav',
                    name: 'Top Navigation',
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    customHeaderRender: (data: { column: any }) => {
      return h('span', { style: { color: 'red' } }, data.column.title)
    },
    customRender: ({ text }) => {
      return h('span', { style: { color: 'red' } }, text)
    },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    form: {
      type: 'input-number',
    },
  },
  {
    title: 'Action',
    dataIndex: 'action',
    width: 240,
  },
]
</script>

<template>
  <ConfigProvider :locale="zhCN">
    <FCurd :modal-width="1000" :api="curd as any" :columns="columns"></FCurd>
  </ConfigProvider>
</template>

<style>
body {
  background: #222;
}
</style>
