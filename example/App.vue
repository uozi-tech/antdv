<script setup lang="ts">
import { h } from 'vue'
import FCurd from '../core'
import { FTableColumn } from '../core/types'
import { curd } from './curd'
import { ConfigProvider } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

const columns: FTableColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    search: true,
    form: {
      type: 'input',
    },
  },
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
  // {
  //   title: 'Type',
  //   dataIndex: 'type',
  //   tags: [1, 2, 3],
  //   form: {
  //     type: 'input',
  //   },
  // },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type2',
    tags: [1, 2, 3],
    form: {
      type: 'input',
    },
    customRender({ value }) {
      const map = {
        1: 'success',
        2: 'warning',
        3: 'error',
      }
      return h('div', {}, map[value])
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
            label: 'Guide',
            children: [
              {
                value: 'disciplines',
                label: 'Disciplines',
                children: [
                  {
                    value: 'consistency',
                    label: 'Consistency',
                  },
                  {
                    value: 'feedback',
                    label: 'Feedback',
                  },
                  {
                    value: 'efficiency',
                    label: 'Efficiency',
                  },
                  {
                    value: 'controllability',
                    label: 'Controllability',
                  },
                ],
              },
              {
                value: 'navigation',
                label: 'Navigation',
                children: [
                  {
                    value: 'side nav',
                    label: 'Side Navigation',
                  },
                  {
                    value: 'top nav',
                    label: 'Top Navigation',
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
  // {
  //   title: 'Name',
  //   dataIndex: 'name',
  //   search: true,
  //   form: {
  //     type: 'select',
  //     select: {
  //       options: [
  //         {
  //           value: 'guide',
  //           label: 'Guide',
  //           children: [
  //             {
  //               value: 'disciplines',
  //               label: 'Disciplines',
  //               children: [
  //                 {
  //                   value: 'consistency',
  //                   label: 'Consistency',
  //                 },
  //                 {
  //                   value: 'feedback',
  //                   label: 'Feedback',
  //                 },
  //                 {
  //                   value: 'efficiency',
  //                   label: 'Efficiency',
  //                 },
  //                 {
  //                   value: 'controllability',
  //                   label: 'Controllability',
  //                 },
  //               ],
  //             },
  //             {
  //               value: 'navigation',
  //               label: 'Navigation',
  //               children: [
  //                 {
  //                   value: 'side nav',
  //                   label: 'Side Navigation',
  //                 },
  //                 {
  //                   value: 'top nav',
  //                   label: 'Top Navigation',
  //                 },
  //               ],
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   },
  // },
  {
    title: 'Age',
    dataIndex: 'age',
    form: {
      type: 'input-number',
    },
  },
  // {
  //   title: 'Checkbox',
  //   dataIndex: 'switch',
  //   form: {
  //     type: 'checkbox',
  //   },
  // },
  {
    title: 'Date',
    dataIndex: 'date',
    form: {
      type: 'date',
    },
    search: true,
  },
  {
    title: 'Date Time',
    dataIndex: 'datetime',
    form: {
      type: 'datetime',
    },
    search: true,
  },
  {
    title: 'Month',
    dataIndex: 'month',
    form: {
      type: 'month',
    },
    search: true,
  },
  {
    title: 'Week',
    dataIndex: 'week',
    form: {
      type: 'week',
    },
    search: true,
  },
  {
    title: 'Time',
    dataIndex: 'time',
    form: {
      type: 'time',
    },
    search: true,
  },
  {
    title: 'Switch',
    dataIndex: 'switch',
    form: {
      type: 'switch',
    },
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    form: {
      type: 'rate',
    },
  },
  {
    title: 'Slider',
    dataIndex: 'slider',
    form: {
      type: 'slider',
    },
  },
  {
    title: 'FileList',
    dataIndex: 'fileList',
    form: {
      type: 'upload',
    },
    customRender: (props) => props.text.join(','),
  },
  {
    title: 'File',
    dataIndex: 'file',
    form: {
      type: 'upload',
    },
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    fixed: 'right',
    width: 240,
  },
]
</script>

<template>
  <ConfigProvider :locale="zhCN">
    <FCurd :modal-width="1000" :api="curd as any" :columns="columns">
      <template #beforeAdd>666</template>
      <template #afterAdd>777</template>
      <template #beforeActions>123</template>
      <template #afterActions>456</template>
    </FCurd>
  </ConfigProvider>
</template>

<style>
body {
  background: #222;
}
</style>
