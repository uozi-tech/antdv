<div align="center">

[//]: # (  <img alt="Owner avatar" src="https://vue-styled-components.com/logo.png" width="220px" />)
  <h1>@fcurd/antdv</h1>
  基于 <a href="https://github.com/vueComponent/ant-design-vue" target="_blank">ant-design-vue</a> 二次封装的CURD组件，旨在解决 antdv 开发中，表单、表格、分页等组件的复用问题，实现快速 CURD。

  <br>

[![CI status][github-action-image]][github-action-url]
[![NPM version][npm-version]][npm-url]
[![minzip size][npm-bundle-size]][npm-url]
[![Coverage Status][coverage]][codecov-url]

[github-action-image]: https://github.com/fcurd/antdv/workflows/Code%20Check/badge.svg
[github-action-url]: https://github.com/fcurd/antdv/actions/workflows/code-check.yml
[npm-version]: https://img.shields.io/npm/v/%40fcurd%2Fadntv
[npm-bundle-size]: https://img.shields.io/bundlephobia/minzip/%40fcurd%2Fadntv
[npm-url]: http://npmjs.org/package/@fcurd/antdv
[coverage]: https://coveralls.io/repos/github/fcurd/antdv/badge.svg?branch=main
[codecov-url]: https://coveralls.io/github/fcurd/antdv?branch=main
</div>

## 安装

```shell
npm i @fcurd/antdv
```

```shell
yarn add @fcurd/antdv
```

```shell
pnpm i @fcurd/antdv
```

## 使用

### curd 参数配置

使用 `FCurd` 组件需要传递一个 curd 对象，推荐使用 `@fcurd/request`

如需自定义，curd 对象需要包含以下属性：

```ts
const curd = {
  getList: (params: Record<string, any>) => Promise.resolve([]),
  getItem: () => Promise.resolve({}),
  update: (data: any) => {},
  create: (data: any) => {},
  delete: (params: Record<string, any>) => {},
  restore: (params: Record<string, any>) => {},
}
```

### Columns 配置

除了 ant-design-vue 的 [Columns](https://www.antdv.com/components/table-cn#column) 配置，我们额外提供了以下配置：

```ts
const columns: FTableColumn[] = [{
  search: true, // 是否支持搜索，默认 false
  form: {
    // 配置表单组件
    type: 'input', // 表单控件类型，下面会提到支持的表单控件
    "[key: type]": {
      // ...
      // 对应控件类型的配置
    },
    formItem: {
      // FormItem 的配置
    }
  },
  customHeaderRender: (data: { column: FTableColumn, title: string }) => {
    // 支持返回 JSX
    // return <div>{title}</div>
    // 支持返回 VNode
    // return h('div', {}, title)
    // 支持返回文本
    // title
  },
}]
```

> **若需要添加操作栏，则需要将 `column` 的 `dataIndex` 或 `key` 设置为 `actions`**

## 支持的表单控件类型

- calendar
- checkbox
- date
- datetime
- input
- input-number
- month
- rate
- select
- slider
- switch
- time
- upload
- week

## 插槽

```vue

<script setup lang="ts">
  import { FCurd, type FTableColumn } from '@fcurd/antdv'

  const columns: FTableColumn[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      search: true,
      form: {
        type: 'input',
      },
    }, {
      title: 'Name',
      dataIndex: 'name',
      search: true,
      form: {
        type: 'input',
      },
      customHeaderRender: (data: { column: any }) => {
        return h('span', { style: { color: 'red' } }, data.column.title)
      },
      customRender: ({ text }) => {
        return h('span', { style: { color: 'red' } }, text)
      },
    },
  ]

</script>

<template>
  <f-curd>
    <template #beforeAdd>在添加按钮前插入内容</template>
    <template #afterAdd>在添加按钮后插入内容</template>
    <template #beforeActions>在表格操作按钮前插入内容</template>
    <template #afterActions>在表格操作按钮后插入内容</template>
  </f-curd>
</template>
```
