import { FTableColumn } from '../types'
import { h } from 'vue'

export const columns: FTableColumn[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    search: true,
    width: 120,
    form: {
      type: 'input',
    },
  },
  {
    title: 'School ID',
    dataIndex: 'school_id',
    search: true,
    width: 120,
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
    title: 'Type',
    dataIndex: 'type',
    tags: [1, 2, 3],
    width: 120,
    form: {
      type: 'input',
    },
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type2',
    tags: [1, 2, 3],
    width: 120,
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
    width: 120,
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
  {
    title: 'Name',
    dataIndex: 'name',
    search: true,
    width: 120,
    form: {
      type: 'select',
      select: {
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
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 120,
    form: {
      type: 'input-number',
    },
  },
  {
    title: 'Checkbox',
    dataIndex: 'switch',
    width: 120,
    form: {
      type: 'checkbox',
    },
  },
  {
    title: 'Date',
    dataIndex: 'date',
    width: 120,
    form: {
      type: 'date',
    },
    search: true,
  },
  {
    title: 'Date Time',
    dataIndex: 'datetime',
    width: 120,
    form: {
      type: 'datetime',
    },
    search: true,
  },
  {
    title: 'Month',
    dataIndex: 'month',
    width: 120,
    form: {
      type: 'month',
    },
    search: true,
  },
  {
    title: 'Week',
    dataIndex: 'week',
    width: 120,
    form: {
      type: 'week',
    },
    search: true,
  },
  {
    title: 'Time',
    dataIndex: 'time',
    width: 120,
    form: {
      type: 'time',
    },
    search: true,
  },
  {
    title: 'Switch',
    dataIndex: 'switch',
    width: 120,
    form: {
      type: 'switch',
    },
  },
  {
    title: 'Rate',
    dataIndex: 'rate',
    width: 120,
    form: {
      type: 'rate',
    },
  },
  {
    title: 'Slider',
    dataIndex: 'slider',
    width: 120,
    form: {
      type: 'slider',
    },
  },
  {
    title: 'FileList',
    dataIndex: 'fileList',
    width: 120,
    form: {
      type: 'upload',
    },
    customRender: (props) => props.text.join(','),
  },
  {
    title: 'File',
    dataIndex: 'file',
    width: 120,
    form: {
      type: 'upload',
    },
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
    // fixed: 'right',
    width: 200,
  },
]
